import React from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../../components/shared/PublicNavbar";
import PublicFooter from "../../components/shared/PublicFooter";
import { enqueueSnackbar } from "notistack";

const ContactUs = () => {
  const handleSendTransmission = () => {
    // In a real application, this would send data to a backend.
    // For now, we simulate a successful send.
    enqueueSnackbar("Transmission Sent Successfully!", { variant: 'success' });
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-body flex flex-col pt-[88px]">
      <PublicNavbar />

      <main className="flex-grow flex flex-col items-center w-full max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-12 gap-16">
        {/*  Page Header  */}
        <section className="w-full text-center md:text-left pt-8">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg uppercase text-primary mb-4 border-l-4 border-primary-container pl-4">Locate The Fuel</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Find us. Contact us. Join the hustle. We are located exactly where you need us for your post-workout recovery or pre-grind energy boost.</p>
        </section>

        {/*  Bento Grid Layout for Contact & Location Info  */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/*  Map Card (Large Area)  */}
          <div className="md:col-span-8 bg-surface-container rounded-DEFAULT border border-surface-variant overflow-hidden flex flex-col">
            <div className="p-6 bg-surface border-b border-surface-variant flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md uppercase text-primary-container">Headquarters</h2>
              <span className="material-symbols-outlined text-primary-container" data-icon="location_on" data-weight="fill">location_on</span>
            </div>
            <div className="w-full h-80 bg-surface-container-lowest relative grayscale contrast-125">
              {/*  Map Placeholder Image  */}
              <img alt="Map Location" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmz4shhYm7nSr7x-y9iyZTvKDV5mB7lROGtA9C57JXIamJne61HE85MbepvF_plXWm-qkGlF0KrSMLskQUSMgTneeKEVCIgNIeLjGHscS11KsLtCsQGNrBP4-FVZ2pPAEpqd92l9fgBwOnJJ-DHKEFusleNidcUbSPNFWlAfsr_s2T_m3-1X2OYC3YtPhmV5qpV_yhFXzKCD37RiUViBdyt-A3btxpiIFb-NE3MGs1DrVx3vd_0UbQDcFR2hT_TFEs5wPOaLlwD9bH"/>
              {/*  Overlay Address Block on Map  */}
              <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-4 border-l-4 border-primary-container">
                <p className="font-label-md text-label-md text-primary uppercase mb-1">Address</p>
                <p className="font-body-md text-body-md text-on-surface font-bold">15 VIAAN BUSINESS HUB UNDER HR FITNESS</p>
                <p className="font-body-md text-body-md text-on-surface-variant">VATVA, AHMEDABAD</p>
              </div>
            </div>
          </div>

          {/*  Hours & Social Card (Side)  */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            {/*  Operating Hours  */}
            <div className="bg-surface-container rounded-DEFAULT border border-surface-variant p-6 flex-grow">
              <h2 className="font-headline-md text-headline-md uppercase text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container" data-icon="schedule" data-weight="fill">schedule</span>
                Operating Hours
              </h2>
              <ul className="flex flex-col gap-4 font-label-md text-label-md">
                <li className="flex justify-between items-center border-b border-surface-variant pb-2">
                  <span className="text-on-surface-variant">MON - FRI</span>
                  <span className="text-primary font-bold">6:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between items-center border-b border-surface-variant pb-2">
                  <span className="text-on-surface-variant">SATURDAY</span>
                  <span className="text-primary font-bold">7:00 AM - 11:00 PM</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span className="text-on-surface-variant">SUNDAY</span>
                  <span className="text-primary-container font-bold px-2 py-1 bg-primary-container/10 border border-primary-container rounded-DEFAULT">REST DAY (CLOSED)</span>
                </li>
              </ul>
            </div>

            {/*  Join Community / QR Code  */}
            <div className="bg-primary-container text-surface-container-lowest rounded-DEFAULT p-6 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined" data-icon="fitness_center" data-weight="fill" style={{"fontSize":"120px"}}>fitness_center</span>
              </div>
              <h2 className="font-headline-md text-headline-md uppercase font-black mb-2 relative z-10">Join The Cult</h2>
              <p className="font-body-md text-body-md font-medium mb-4 relative z-10">Scan to enter the community chat. Exclusive drops, nutrition tips, raw motivation.</p>
              <div className="w-24 h-24 bg-surface-container-lowest p-2 rounded-DEFAULT relative z-10 flex items-center justify-center border-2 border-surface-container-lowest">
                <img alt="QR Code" className="w-full h-full object-cover filter contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDTDkDTAt9IiElJMxMpJKkBbg6n8clKYUaPuVXerO3cknKNLq75hG2Z51c6xVy6BUkezIKYBSXNfpW-ziRluUdpN4q0WK7G_IQ9Z4DUs3kUeAKRFokylxSi47DLKQ_C1IjOjrgy_NFPHt_A6WXiKpkfsfUMAMXcksBZgn2Go-52M4rwyXl8iXcgdbCA5rEHD-5Oe0rEiu0y6KT_waEk_aCz6t2OrRUotx4Nd1wAGLxBZNuX4TrP8_tzTjTTjAec4fFAWjsIbD_sKyf"/>
              </div>
            </div>
          </div>
        </section>

        {/*  Contact Form Section  */}
        <section className="w-full bg-surface-container rounded-DEFAULT border border-surface-variant p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg uppercase text-primary mb-4">Direct Comms</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">Got a question about macros? Need to pre-order a shake for after your deadlift session? Send a transmission.</p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-DEFAULT border border-surface-variant">
                    <span className="material-symbols-outlined text-primary-container" data-icon="call" data-weight="fill">call</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase">Phone</p>
                    <p className="font-headline-md text-headline-md text-primary">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface flex items-center justify-center rounded-DEFAULT border border-surface-variant">
                    <span className="material-symbols-outlined text-primary-container" data-icon="mail" data-weight="fill">mail</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant uppercase">Email</p>
                    <p className="font-body-lg text-body-lg text-primary font-bold">hustle@fitbitecafe.com</p>
                  </div>
                </div>

                {/*  Social Links  */}
                <div className="mt-4 pt-6 border-t border-surface-variant">
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase mb-4">Social Network</p>
                  <div className="flex gap-4">
                    <Link className="w-10 h-10 bg-surface border border-surface-variant rounded-DEFAULT flex items-center justify-center text-on-surface hover:border-primary-container hover:text-primary-container transition-colors" to="/">
                      <span className="material-symbols-outlined" data-icon="share">share</span>
                    </Link>
                    <Link className="w-10 h-10 bg-surface border border-surface-variant rounded-DEFAULT flex items-center justify-center text-on-surface hover:border-primary-container hover:text-primary-container transition-colors" to="/">
                      <span className="material-symbols-outlined" data-icon="photo_camera">photo_camera</span>
                    </Link>
                    <Link className="w-10 h-10 bg-surface border border-surface-variant rounded-DEFAULT flex items-center justify-center text-on-surface hover:border-primary-container hover:text-primary-container transition-colors" to="/">
                      <span className="material-symbols-outlined" data-icon="play_arrow">play_arrow</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/*  Form  */}
            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleSendTransmission(); }}>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface uppercase" htmlFor="name">Identification</label>
                <input required className="w-full bg-surface border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-primary placeholder-on-surface-variant focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" id="name" placeholder="YOUR NAME" type="text"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface uppercase" htmlFor="email">Comms Link (Email)</label>
                <input required className="w-full bg-surface border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-primary placeholder-on-surface-variant focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all" id="email" placeholder="YOUR EMAIL" type="email"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface uppercase" htmlFor="message">Transmission</label>
                <textarea required className="w-full bg-surface border border-outline-variant rounded-DEFAULT px-4 py-3 font-body-md text-body-md text-primary placeholder-on-surface-variant focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all resize-none" id="message" placeholder="WHAT DO YOU NEED FUEL FOR?" rows="4"></textarea>
              </div>
              <button className="mt-2 bg-primary-container text-surface-container-lowest font-label-md text-label-md font-black uppercase px-8 py-4 btn-hard-shadow self-start flex items-center gap-2 hover:bg-primary transition-colors" type="submit">
                Send Transmission
                <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default ContactUs;
