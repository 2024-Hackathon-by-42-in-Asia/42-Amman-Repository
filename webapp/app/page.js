import dynamic from 'next/dynamic';
import SparklesText from "@/components/ui/sparkles-text";
import GradualSpacing from "@/components/ui/gradual-spacing";
import PulsatingButton from "@/components/ui/pulsating-button";
import Link from "next/link";
import LoadingScreen from './components/LoadingScreen';

const HomeGallery = dynamic(() => import('./components/HomeGallery'), { ssr: false, loading: () => <LoadingScreen /> });
const TracingBeam = dynamic(() => import('@/components/ui/tracing-beam').then((data) => data.TracingBeam), { ssr: false, loading: ()=> <LoadingScreen /> });

export default async function Home() {
  let images = [
    {
      url: "https://cdn.intra.42.fr/users/dc0c95bf0aa3aa16641774eccc4fbdef/mkurkar.jpg",
      name: "Mohammad Kurkar",
    },
    {
      url: "https://cdn.intra.42.fr/users/deddd2b6f3ced1b9cdc8e7ab1212c57d/dana.jpg",
      name: "Dana"
    },
    {
      url: "https://cdn.intra.42.fr/users/ad36840162fdd6ac52e0e0f9afa2b891/yaltayeh.jpg",
      name: "Yacoup altayeh"
    },
    {
      url: "https://cdn.intra.42.fr/users/1879788d88817729c5d4fbd2a0f77e4d/bismail.jpg",
      name: "Basil Ismail"
    },
    {
      url: "https://cdn.intra.42.fr/users/4c07a7730129533071182eee4c7e3866/modat.jpg",
      name: "Mariam Odat"
    },
    {
      url: "https://cdn.intra.42.fr/users/188bd65455d705b854ba698d76c84c8b/dqaddomi.jpg",
      name: "Dania Qaddomi"
    },
    {
      url: "https://cdn.intra.42.fr/users/d1792caf4b85d739a4b5a819918fc9e1/yalrfai.jpg",
      name: "Yaman Al-Rifai"
    },
    {
      url: "https://cdn.intra.42.fr/users/45d802441945171c2095885f0317a8e3/malrifai.jpg",
      name: "Marwan Al-Rifai"
    },
    {
      url: "https://cdn.intra.42.fr/users/3e1421254f5b2d9bcb380d1b01797a34/ahramada.jpg",
      name: "Ahmad Ramada"
    },
    {
      url: "https://cdn.intra.42.fr/users/83a871a44bd84f5d97e8766b5d75c2b8/hmeltaha.jpg",
      name: "Hala Meltaha"
    },
    {
      url: "https://cdn.intra.42.fr/users/eb4b24b498d8fbc57c404aecb00c516a/oshawish.jpg",
      name: "Omar Shawish"
    },
    {
      "url": "https://cdn.intra.42.fr/users/c7bc195303212c2af7b43eb8c0cb4796/fnashwan.jpg",
      "name": "Farah Nashwan"
    },
    {
       "url": "https://cdn.intra.42.fr/users/d9f35e9552855375e9a548befdd1b7fe/jalqam.jpg",
       "name" : "Joud Alqam"
    },
    {
       "url": "https://cdn.intra.42.fr/users/3986a99f60b2e323ba6edfec0950d089/fmaaita.jpg",
       "name" : "Fatima Maaita"
    },
    {
       "url": "https://cdn.intra.42.fr/users/c3c734344b47fba58141c6743bf9f6a5/rabu-shr.jpg",
       "name" : "Roaa Abu Shreeha"
    },
    {
       "url": "https://cdn.intra.42.fr/users/3d5eddcde315ecf068187cc1083d1733/skteifan.jpg",
       "name" : "Sara Kteifan"
    },
    {
      "url": "https://cdn.intra.42.fr/users/46d6eb681a0e2f680bdd39aa80fbcaf0/abdsalah.jpg",
      "name" : "Abdelrahman Salah"
   },
   {
      "url": "https://cdn.intra.42.fr/users/3e29459a128dceb355a6095dcdba4bd7/tbaniatt.jpg",
      "name" : "Thaer Baniatta"
   }
  ]
  return (
    <main>
      <TracingBeam>
        <div id="intro-sections" className="tw-text-center">
          <SparklesText text="42Asia hackathon Amman project" diabled={true}/>
          <GradualSpacing
            className="tw-text-primary-foreground tw-font-display tw-text-center md:tw-text-xl min-[10px]:tw-text-[14px] tw-text-wrap tw-font-bold tw--tracking-widest tw- tw-text-black md:tw-text-xl md:tw-leading-[5rem] dark:tw-text-white"
            text="We will reduce carbon emissions through the collective basket"
          />
          <Link href="/project" className="tw-p-5">
            <PulsatingButton
              text="Explore Our Work"
              pulseColor="163, 91, 33"
              backgroundColor="#a68469"
              textColor="white"
              animationDuration="1.5s"
              buttonWidth="170px"
              buttonHeight="40px"
              key="explorebtn"
            />
          </Link>
        </div>
        <div id="developers">
          <HomeGallery images={images} />
        </div>
      </TracingBeam>
    </main>
  );
}
