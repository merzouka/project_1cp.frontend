import { SectionWrapper } from "./section-wrapper";
import { Guide } from "./guide";

export const GuideSection = () => {
  return (
    <SectionWrapper title="guide du hajj">
      <p className="text-center mb-7 max-w-[60ch]">
        {
          "Pour un Hajj valide, les pèlerins doivent connaître les 'Menaasik al-Hajj' : les rites ordonnés par Dieu à Abraham. Ces rites (piliers, obligations et recommandations) guident et valident le pèlerinage."
        }
      </p>
      <a href={`/guide`}>
        <p className="text-center pb-5 hover:text-orange-400 text-lg md:font-semibold">
          Voir le guide complet
        </p>
      </a>
      <Guide />
    </SectionWrapper>
  );
};
