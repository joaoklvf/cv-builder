import styled from "styled-components";

export const Container = styled.div`
  @media print {
    /* Oculta tudo exceto a área do currículo durante a impressão */
    body * {
      visibility: hidden;
    }
    .printable-area, .printable-area * {
      visibility: visible;
    }
    .printable-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
`;