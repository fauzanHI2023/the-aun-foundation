import ResultHead from "./ResultHead";
import DonationInfo from "./DonationInfo";
import DonationSteps, { buildSteps } from "./DonationSteps";
import CampaignProgress from "./CampaignProgress";
import ResultActions from "./ResultActions";
import { LoginCta } from "./LoginCta";

export function ResultPanel({
    donorName,
    statusLabel,
    statusTone,
    infoRows,
    createdAtLabel,
    paidAtLabel,
    campaign,
    onCheckAnother,
    onShare,
}) {
    const steps = buildSteps({ createdAtLabel, paidAtLabel, statusTone });

    return (
        <div className="animate-fadeUp">
            <div className="glass-panel mb-3.5 rounded-xl">
                <ResultHead
                    donorName={donorName}
                    statusLabel={statusLabel}
                    statusTone={statusTone}
                />
                <div className="mx-7 h-px bg-gradient-to-r from-transparent via-grey/20 to-transparent" />
                <div className="px-7 pb-7 pt-[26px]">
                    <DonationInfo rows={infoRows} />
                    <DonationSteps steps={steps} />
                </div>
            </div>

            {campaign && (
                <CampaignProgress
                    title={campaign.title}
                    raisedLabel={campaign.raisedLabel}
                    targetLabel={campaign.targetLabel}
                    percent={campaign.percent}
                />
            )}

            <LoginCta />

            <ResultActions onCheckAnother={onCheckAnother} onShare={onShare} />
        </div>
    );
}

export default ResultPanel;
