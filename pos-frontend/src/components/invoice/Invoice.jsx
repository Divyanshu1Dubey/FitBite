import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import brand from "../../constants/brand";
import logo from "../../assets/images/fitbite-logo.jpeg";

const LINE_WIDTH = 32;

// ─── Bluetooth Printer Profiles ────────────────────────────────
const PRINTER_PROFILES = [
  {
    id: "ble-ffe0",
    name: "BLE FFE0/FFE1 (most common)",
    serviceUUID: "0000ffe0-0000-1000-8000-00805f9b34fb",
    characteristicUUID: "0000ffe1-0000-1000-8000-00805f9b34fb",
  },
  {
    id: "ble-fff0",
    name: "BLE FFF0/FFF2",
    serviceUUID: "0000fff0-0000-1000-8000-00805f9b34fb",
    characteristicUUID: "0000fff2-0000-1000-8000-00805f9b34fb",
  },
  {
    id: "printer-4953",
    name: "Printer 4953 (Serial)",
    serviceUUID: "49535343-fe7d-4ae5-8fa9-9fafd205e455",
    characteristicUUID: "49535343-1e4d-4bd9-ba61-23c647249616",
  },
  {
    id: "ble-18f0",
    name: "BLE 18F0 (some printers)",
    serviceUUID: "000018f0-0000-1000-8000-00805f9b34fb",
    characteristicUUID: "00002af1-0000-1000-8000-00805f9b34fb",
  },
];

const getProfileById = (id) =>
  PRINTER_PROFILES.find((profile) => profile.id === id) || PRINTER_PROFILES[0];

// ─── Text Formatting Helpers ───────────────────────────────────
const centerText = (text, width) => {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length >= width) return trimmed;
  const leftPad = Math.floor((width - trimmed.length) / 2);
  return " ".repeat(leftPad) + trimmed;
};

const padLine = (left, right, width) => {
  const leftText = left || "";
  const rightText = right || "";
  const space = width - leftText.length - rightText.length;
  if (space <= 1) return `${leftText} ${rightText}`;
  return leftText + " ".repeat(space) + rightText;
};

const truncate = (text, max) => {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1))}.`;
};

const formatMoney = (value) => `Rs.${Number(value || 0).toFixed(2)}`;

const formatDateTime = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ─── ESC/POS Commands for Thermal Printers ─────────────────────
const ESC = 0x1b;
const GS = 0x1d;

const ESCPOS = {
  INIT: new Uint8Array([ESC, 0x40]),                    // Initialize printer
  ALIGN_CENTER: new Uint8Array([ESC, 0x61, 0x01]),      // Center align
  ALIGN_LEFT: new Uint8Array([ESC, 0x61, 0x00]),        // Left align
  BOLD_ON: new Uint8Array([ESC, 0x45, 0x01]),           // Bold on
  BOLD_OFF: new Uint8Array([ESC, 0x45, 0x00]),          // Bold off
  DOUBLE_HEIGHT_ON: new Uint8Array([ESC, 0x21, 0x10]),  // Double height
  NORMAL_SIZE: new Uint8Array([ESC, 0x21, 0x00]),       // Normal size
  LINE_FEED: new Uint8Array([0x0a]),                    // Line feed
  CUT_PAPER: new Uint8Array([GS, 0x56, 0x00]),          // Full cut
  PARTIAL_CUT: new Uint8Array([GS, 0x56, 0x01]),        // Partial cut
  FEED_3_LINES: new Uint8Array([ESC, 0x64, 0x03]),      // Feed 3 lines
};

// ─── Build Receipt ─────────────────────────────────────────────
const buildReceiptText = (orderInfo) => {
  if (!orderInfo) return "";

  const orderDate =
    orderInfo.orderDate || orderInfo.createdAt || new Date().toISOString();
  const orderId =
    orderInfo.orderId || orderInfo._id || Math.floor(new Date(orderDate).getTime());
  const customer = orderInfo.customerDetails || {};
  const bills = orderInfo.bills || {};
  const items = orderInfo.items || [];

  const lines = [];
  lines.push(centerText(brand.name.toUpperCase(), LINE_WIDTH));
  if (brand.tagline) lines.push(centerText(brand.tagline, LINE_WIDTH));
  if (brand.addressLines?.length) {
    brand.addressLines.filter(Boolean).forEach((line) => {
      lines.push(centerText(line, LINE_WIDTH));
    });
  }
  if (brand.phone) lines.push(centerText(`Phone: ${brand.phone}`, LINE_WIDTH));
  if (brand.gst) lines.push(centerText(`GST: ${brand.gst}`, LINE_WIDTH));

  lines.push("-".repeat(LINE_WIDTH));
  lines.push(`Order: ${orderId}`);
  lines.push(`Date: ${formatDateTime(orderDate)}`);
  if (customer.name) lines.push(`Customer: ${customer.name}`);
  if (customer.phone && customer.phone !== "N/A") lines.push(`Phone: ${customer.phone}`);
  if (customer.guests) lines.push(`Guests: ${customer.guests}`);
  lines.push("-".repeat(LINE_WIDTH));
  lines.push(padLine("Item", "Total", LINE_WIDTH));

  items.forEach((item) => {
    const itemTotal =
      typeof item.price === "number"
        ? item.price
        : Number(item.pricePerQuantity || 0) * Number(item.quantity || 0);
    const right = formatMoney(itemTotal);
    const left = truncate(
      `${item.name} x${item.quantity}`,
      LINE_WIDTH - right.length - 1
    );
    lines.push(padLine(left, right, LINE_WIDTH));
  });

  lines.push("-".repeat(LINE_WIDTH));
  lines.push(padLine("Subtotal", formatMoney(bills.total), LINE_WIDTH));
  lines.push(padLine("Tax", formatMoney(bills.tax), LINE_WIDTH));
  lines.push(
    padLine("Grand Total", formatMoney(bills.totalWithTax), LINE_WIDTH)
  );
  lines.push("-".repeat(LINE_WIDTH));
  lines.push(`Payment: ${orderInfo.paymentMethod || "Pending"}`);
  if (orderInfo.paymentData?.razorpay_payment_id) {
    lines.push(`RZP: ${orderInfo.paymentData.razorpay_payment_id}`);
  }
  lines.push("");
  if (brand.footerLine) lines.push(centerText(brand.footerLine, LINE_WIDTH));
  lines.push("");

  return lines.join("\n");
};

// ─── Build ESC/POS Binary Payload ──────────────────────────────
const buildEscPosPayload = (receiptText) => {
  const encoder = new TextEncoder();
  const textBytes = encoder.encode(receiptText);

  // Combine: INIT + text + feed + cut
  const parts = [
    ESCPOS.INIT,
    ESCPOS.ALIGN_LEFT,
    ESCPOS.NORMAL_SIZE,
    textBytes,
    ESCPOS.FEED_3_LINES,
    ESCPOS.PARTIAL_CUT,
  ];

  const totalLength = parts.reduce((sum, p) => sum + p.length, 0);
  const payload = new Uint8Array(totalLength);
  let offset = 0;
  for (const part of parts) {
    payload.set(part, offset);
    offset += part.length;
  }
  return payload;
};

// ─── LocalStorage helpers ──────────────────────────────────────
const STORAGE_KEY_PROFILE = "pos-printer-profile";
const STORAGE_KEY_PRINTER = "pos-last-printer";

const getSavedProfile = () =>
  localStorage.getItem(STORAGE_KEY_PROFILE) || PRINTER_PROFILES[0].id;

const getSavedPrinterName = () =>
  localStorage.getItem(STORAGE_KEY_PRINTER) || "";

// ─── Main Invoice Component ────────────────────────────────────
const Invoice = ({ orderInfo, setShowInvoice }) => {
  const [profileId, setProfileId] = useState(getSavedProfile);
  const [printerStatus, setPrinterStatus] = useState({
    connected: false,
    name: getSavedPrinterName(),
    error: "",
    connecting: false,
    printing: false,
  });
  const printerRef = useRef({ device: null, characteristic: null });
  const receiptText = useMemo(() => buildReceiptText(orderInfo), [orderInfo]);

  // Check if Bluetooth is available
  const hasBluetooth = typeof navigator !== "undefined" && !!navigator.bluetooth;

  const handleProfileChange = useCallback((event) => {
    const nextProfileId = event.target.value;
    setProfileId(nextProfileId);
    localStorage.setItem(STORAGE_KEY_PROFILE, nextProfileId);
    printerRef.current = { device: null, characteristic: null };
    setPrinterStatus({ connected: false, name: "", error: "", connecting: false, printing: false });
  }, []);

  const connectPrinter = useCallback(async () => {
    if (!hasBluetooth) {
      setPrinterStatus((prev) => ({
        ...prev,
        error: "Bluetooth not available. Use Chrome on Android with HTTPS.",
      }));
      return false;
    }

    setPrinterStatus((prev) => ({ ...prev, connecting: true, error: "" }));

    try {
      const profile = getProfileById(profileId);
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: PRINTER_PROFILES.map((item) => item.serviceUUID),
      });

      device.addEventListener("gattserverdisconnected", () => {
        printerRef.current = { device: null, characteristic: null };
        setPrinterStatus({
          connected: false,
          name: device.name || "Printer",
          error: "Printer disconnected. Tap Connect to reconnect.",
          connecting: false,
          printing: false,
        });
      });

      const server = await device.gatt.connect();

      // Try each profile's service to find one that works
      let characteristic = null;
      let foundProfile = profile;

      try {
        const service = await server.getPrimaryService(profile.serviceUUID);
        characteristic = await service.getCharacteristic(profile.characteristicUUID);
      } catch {
        // Try other profiles automatically
        for (const altProfile of PRINTER_PROFILES) {
          if (altProfile.id === profile.id) continue;
          try {
            const service = await server.getPrimaryService(altProfile.serviceUUID);
            characteristic = await service.getCharacteristic(altProfile.characteristicUUID);
            foundProfile = altProfile;
            // Save the working profile
            setProfileId(altProfile.id);
            localStorage.setItem(STORAGE_KEY_PROFILE, altProfile.id);
            break;
          } catch {
            continue;
          }
        }
      }

      if (!characteristic) {
        setPrinterStatus({
          connected: false,
          name: device.name || "",
          error: "Could not find a compatible service. Try a different printer profile.",
          connecting: false,
          printing: false,
        });
        return false;
      }

      printerRef.current = { device, characteristic };
      const printerName = device.name || "Bluetooth Printer";
      localStorage.setItem(STORAGE_KEY_PRINTER, printerName);

      setPrinterStatus({
        connected: true,
        name: printerName,
        error: "",
        connecting: false,
        printing: false,
      });
      return true;
    } catch (error) {
      console.error("Bluetooth connect error:", error);
      const msg = error.message?.includes("cancelled")
        ? "Pairing cancelled. Tap Connect to try again."
        : "Connection failed. Make sure printer is ON and paired in Bluetooth settings.";
      setPrinterStatus((prev) => ({
        ...prev,
        connected: false,
        error: msg,
        connecting: false,
      }));
      return false;
    }
  }, [profileId, hasBluetooth]);

  const writeChunks = useCallback(async (characteristic, data) => {
    const chunkSize = 100; // Slightly smaller for reliability
    for (let offset = 0; offset < data.length; offset += chunkSize) {
      const chunk = data.slice(offset, offset + chunkSize);
      await characteristic.writeValueWithoutResponse
        ? await characteristic.writeValueWithoutResponse(chunk)
        : await characteristic.writeValue(chunk);
      await new Promise((resolve) => setTimeout(resolve, 30));
    }
  }, []);

  const handleBluetoothPrint = useCallback(async () => {
    try {
      // Auto-connect if not connected
      if (!printerRef.current.characteristic) {
        const success = await connectPrinter();
        if (!success) return;
      }

      const characteristic = printerRef.current.characteristic;
      if (!characteristic) return;

      setPrinterStatus((prev) => ({ ...prev, printing: true, error: "" }));

      const payload = buildEscPosPayload(receiptText);
      await writeChunks(characteristic, payload);

      setPrinterStatus((prev) => ({ ...prev, printing: false, error: "" }));
      return true;
    } catch (error) {
      console.error("Bluetooth print error:", error);
      printerRef.current = { device: null, characteristic: null };
      setPrinterStatus((prev) => ({
        ...prev,
        connected: false,
        printing: false,
        error: "Print failed. Printer may have disconnected. Tap Print to reconnect.",
      }));
      return false;
    }
  }, [connectPrinter, receiptText, writeChunks]);

  // Print & Done — one tap to print + close
  const handlePrintAndDone = useCallback(async () => {
    const success = await handleBluetoothPrint();
    if (success) {
      setTimeout(() => setShowInvoice(false), 500);
    }
  }, [handleBluetoothPrint, setShowInvoice]);

  // Browser print fallback
  const handleBrowserPrint = useCallback(() => {
    const printWindow = window.open("", "", "width=400,height=600");
    if (!printWindow) return;

    const escapeHtml = (text) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    printWindow.document.write(`
      <html>
        <head>
          <title>${brand.name} Receipt</title>
          <style>
            body { font-family: 'Courier New', monospace; padding: 8px; margin: 0; }
            pre { font-size: 11px; white-space: pre-wrap; line-height: 1.4; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <pre>${escapeHtml(receiptText)}</pre>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 300);
  }, [receiptText]);

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-end sm:items-center z-50">
      <div
        className="bg-[#1a1a1a] w-full sm:w-[95%] sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col"
        style={{ maxHeight: "95vh" }}
      >
        {/* ─── Header ─── */}
        <div className="flex items-center justify-between p-4 border-b border-[#333]">
          <div className="flex items-center gap-3">
            <img src={logo} className="h-9 w-9 rounded-full" alt="Logo" />
            <div>
              <h2 className="brand-display text-xl text-[#f5f5f5]">
                {brand.name}
              </h2>
              <p className="text-[10px] text-[#888]">{brand.tagline}</p>
            </div>
          </div>
          <button
            onClick={() => setShowInvoice(false)}
            className="text-[#888] hover:text-white text-2xl p-2 -mr-2"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ─── Receipt Preview ─── */}
        <div className="overflow-y-auto flex-1 p-4">
          <div className="rounded-xl border border-[#333] bg-[#111] p-4">
            <pre className="text-[11px] whitespace-pre-wrap font-mono text-[#e0e0e0] leading-relaxed">
              {receiptText}
            </pre>
          </div>
        </div>

        {/* ─── Printer Controls ─── */}
        <div className="p-4 border-t border-[#333] space-y-3">
          {/* Status Bar */}
          {printerStatus.connected && (
            <div className="flex items-center gap-2 bg-[#1a2e1a] rounded-lg px-3 py-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-400 text-xs font-medium">
                {printerStatus.name}
              </span>
            </div>
          )}

          {printerStatus.error && (
            <div className="bg-[#2e1a1a] rounded-lg px-3 py-2">
              <p className="text-red-400 text-xs">{printerStatus.error}</p>
            </div>
          )}

          {/* Printer Profile Selector */}
          <div className="flex items-center gap-2">
            <select
              value={profileId}
              onChange={handleProfileChange}
              className="flex-1 rounded-lg border border-[#333] bg-[#222] text-[#ccc] px-3 py-2.5 text-sm focus:outline-none focus:border-[#555]"
            >
              {PRINTER_PROFILES.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
            <button
              onClick={connectPrinter}
              disabled={printerStatus.connecting}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold min-w-[90px] ${
                printerStatus.connected
                  ? "bg-[#1a2e1a] text-green-400 border border-green-800"
                  : "bg-[#333] text-[#ccc] border border-[#555]"
              } ${printerStatus.connecting ? "opacity-50" : ""}`}
            >
              {printerStatus.connecting
                ? "..."
                : printerStatus.connected
                ? "✓ Paired"
                : "Connect"}
            </button>
          </div>

          {/* Action Buttons — big touch targets */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleBluetoothPrint}
              disabled={printerStatus.printing || printerStatus.connecting}
              className={`brand-bg rounded-xl py-4 text-base font-bold ${
                printerStatus.printing ? "opacity-50" : ""
              }`}
            >
              {printerStatus.printing ? "Printing..." : "🖨 Print"}
            </button>
            <button
              onClick={handlePrintAndDone}
              disabled={printerStatus.printing || printerStatus.connecting}
              className={`brand-bg-strong rounded-xl py-4 text-base font-bold ${
                printerStatus.printing ? "opacity-50" : ""
              }`}
            >
              {printerStatus.printing ? "..." : "Print & Done ✓"}
            </button>
          </div>

          {/* Secondary: browser print */}
          <button
            onClick={handleBrowserPrint}
            className="w-full bg-[#222] text-[#aaa] rounded-xl py-3 text-sm border border-[#333]"
          >
            Browser Print / Share
          </button>

          {!hasBluetooth && (
            <p className="text-[10px] text-[#666] text-center">
              Bluetooth requires Chrome on Android over HTTPS.
              For local testing, enable chrome://flags → "Insecure origins treated as secure"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
