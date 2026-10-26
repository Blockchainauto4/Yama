import React from "react";
import { FeaturedProofSlideSection } from "./FeaturedProofSlideSection";

interface FeaturedVideoSectionProps {
  onOpenPopup?: () => void;
}

/**
 * FeaturedVideoSection foi atualizada para o Slide oficial de comprovantes com as imagens
 * conforme solicitado pelo usuário.
 */
export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({
  onOpenPopup,
}) => {
  return <FeaturedProofSlideSection onOpenPopup={onOpenPopup} />;
};

export { FeaturedProofSlideSection };
