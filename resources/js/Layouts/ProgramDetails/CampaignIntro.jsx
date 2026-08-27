import React, { useMemo } from "react";
import DOMPurify from "dompurify";

export default function CampaignIntro({ program }) {
    const cleanDescription = useMemo(
        () =>
            DOMPurify.sanitize(program.description ?? "", {
                FORBID_ATTR: ["style", "width", "height"],
            }),
        [program.description]
    );
    return (
        <section className="mb-20">
            <h2 className="italic text-4xl font-medium mb-4 text-on-surface-dark">
                {program.title_program}
            </h2>
            <article
                className="campaign-description prose prose-stone max-w-none ..."
                dangerouslySetInnerHTML={{
                    __html: cleanDescription,
                }}
            />
        </section>
    );
}
