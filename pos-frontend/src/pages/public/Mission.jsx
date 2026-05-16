import React from "react";
import { Link } from "react-router-dom";
import PublicNavbar from "../../components/shared/PublicNavbar";
import PublicFooter from "../../components/shared/PublicFooter";

const Mission = () => {
  return (
    <div className="bg-background text-on-background min-h-screen font-body flex flex-col pt-[88px]">
      <PublicNavbar />
      
      <main className="flex-grow">
        {/*  Hero Section  */}
        <section className="relative w-full min-h-[614px] flex items-center justify-center px-margin-mobile md:px-margin-desktop py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt="Gym Workout" className="w-full h-full object-cover opacity-30 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBDAbJ-3q8AnubZemYLo3opY88zHMWw_3XiMZQbGIf8yQVagaFfJrPBkx8yRBBItBAodVlLovI0fGEIWbs6jXNXYvu12p6sDY3AKgnF1Dvhtg28QNNApmm5N51en4IVrN2TwRpjKrcNLnzLfbNGXpvWs0RRJ4jBZyx7v3wKXaZ9XWJLEKD4sUaMyqMmEmap1dSmm7f9CyGsfk_yHgny_XjZfHlEy2NCzrqoAo52uLr5dcQnpSUt1g6ZV_VRUj-Gi148nWgI89tEzt_"/>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-container-max-width mx-auto text-center">
            <div className="inline-block border border-primary-container text-primary-container px-4 py-2 font-label-md text-label-md mb-6 bg-surface-container/50 backdrop-blur">
              OUR MISSION
            </div>
            <h1 className="font-display-xl text-[48px] md:text-[80px] font-black uppercase text-primary leading-none mb-6 tracking-tighter">
              FUEL YOUR <span className="text-primary-container italic">HUSTLE</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              We don't do 'diets'. We do fuel. Built for the gym freaks, the early risers, and the relentless. High protein, clean macros, and zero compromises on taste.
            </p>
          </div>
        </section>

        {/*  Bento Grid Section  */}
        <section className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/*  Card 1: Clean Ingredients  */}
            <div className="col-span-1 md:col-span-8 bg-surface-container-high border border-outline-variant p-8 relative overflow-hidden group clip-brutal">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 bg-surface text-primary-container border border-primary-container flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>eco</span>
                  </div>
                  <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase mb-4">Clean &amp; Fresh Ingredients</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                    Real food for real results. No artificial garbage. We source locally where possible and prioritize high-quality proteins, complex carbs, and healthy fats to rebuild what the iron tears down.
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                  <span className="inline-block px-3 py-1 border border-outline font-label-md text-label-md text-on-surface">100% REAL</span>
                  <span className="inline-block px-3 py-1 bg-primary-container text-black font-label-md text-label-md font-bold">NO BS</span>
                </div>
              </div>
            </div>

            {/*  Card 2: Energy  */}
            <div className="col-span-1 md:col-span-4 bg-primary-container text-black p-8 relative overflow-hidden clip-brutal">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-12 h-12 bg-black text-primary-container flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md font-black uppercase mb-4">Energy that Fuels You</h2>
                  <p className="font-body-md text-body-md font-medium">
                    Pre-workout kicks or post-workout recovery. Our meals are macro-calculated to deliver sustained energy.
                  </p>
                </div>
              </div>
              {/*  Decorative graphic  */}
              <div className="absolute -bottom-10 -right-10 text-[120px] opacity-20 font-black italic">
                ⚡
              </div>
            </div>

            {/*  Card 3: Made for Gym Freaks  */}
            <div className="col-span-1 md:col-span-12 bg-surface-container border border-outline-variant p-0 relative overflow-hidden grid grid-cols-1 md:grid-cols-2 mt-gutter clip-brutal">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-primary-container mb-4">
                  <span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>fitness_center</span>
                  <span className="font-label-md text-label-md font-bold tracking-widest uppercase">The Community</span>
                </div>
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase mb-6">Made for Gym Freaks</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                  FitBite isn't just a cafe; it's a hub for the dedicated. We speak your language—macros, PRs, and progressive overload. Our menu is designed by athletes, for athletes, ensuring every bite serves a purpose.
                </p>
                <Link className="inline-flex items-center gap-2 text-primary-container font-label-md text-label-md uppercase font-bold hover:translate-x-2 transition-transform duration-200" to="/menu">
                  View The Menu <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
              <div className="h-64 md:h-auto relative bg-surface-container-highest">
                <img alt="Barbell grip" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3UtI4GANpSgmQtxH0PEooAEqjtX7e0eT36MwLBjq2OWRaTpLcECz2De_k5Weo44YSZM9i7Aw1xfGX1teWVpeioQMTZIaZ0gQhFU_BvFe0QYe58SD1fZiZ5VlJd2uWBXKf8X7B1kr1G3x5Sj3uBMbypK3rihEq0CnEXGPYn_UW_JVF-Oc-_T14pInaz4ySA9oy_3zDncdpFhX0NqehycSTYKKK2lXaBAtAvSJhMF_ZSsSCbJLlvBJYpH-NNRKouQiXgi_kvA1FxTIc"/>
                <div className="absolute inset-0 bg-black/40"></div>
                {/*  Overlay stat  */}
                <div className="absolute bottom-8 right-8 bg-background border border-primary-container p-4 transform rotate-3">
                  <div className="font-display-xl text-headline-lg text-primary-container">40g+</div>
                  <div className="font-label-md text-label-md text-on-surface uppercase">Protein per meal</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};

export default Mission;
