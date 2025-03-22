import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #00838F;
  color: white;
  text-align: center;
  padding: 15px 0;
  width: 100%;
`;

const FooterText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>© 2025 Colégio Lumiar - Todos os direitos reservados</FooterText>
    </FooterContainer>
  );
};

export default Footer;