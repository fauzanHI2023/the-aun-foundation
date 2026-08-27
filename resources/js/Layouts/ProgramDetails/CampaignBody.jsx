import ImageGallery from "./ImageGallery";
import CampaignIntro from "./CampaignIntro";
import VideoSection from "./VideoSection";
import ProgramDetails from "./ProgramDetails";
import HighlightPhotos from "./HighlightPhotos";
import DonationPanel from "./DonationPanel";

export default function CampaignBody() {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[62%]">
                <ImageGallery />
                <CampaignIntro />
                <VideoSection />
                <HighlightPhotos />
            </div>
            <DonationPanel />
        </div>
    );
}
