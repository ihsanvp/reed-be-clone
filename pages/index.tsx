import Page from "components/Page";
import Showreel from "components/Showreel";
import { BsArrowRight } from "react-icons/bs";

export default function HomePage() {
  return (
    <Page>
      <section>
        <div className="mx-auto px-[8vw] md:px-[13vw] flex flex-col">
          <div className="flex border-b">
            <h2 className="text-[5vw] md:text-[1.8vw] leading-[1.4] pb-[15vw] md:pb-[5vw] pt-[5vw] md:pt-[2vw] font-medium font-barlow">
              We build lovable <br /> products & experiences.
            </h2>
          </div>
          <div className="flex">
            <h1 className="text-primary text-[11vw] md:text-[9vw] leading-[1] font-bold py-[12vw] md:py-[5vw] font-barlow">
              Studiotwofour
            </h1>
          </div>
          <div className="flex border-t">
            <div className="pt-[25vw] md:pt-[5vw] grid grid-cols-1 md:grid-cols-6 gap-x-10 gap-y-5 w-full">
              <div className="col-span-1 md:col-span-2">
                <div className="text-sm font-barlow uppercase tracking-widest flex items-center gap-5">
                  <span>Discover our showreel</span>
                  <BsArrowRight size={20} />
                </div>
              </div>
              <div className="col-span-1 md:col-span-4">
                <Showreel />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </Page>
  );
}
