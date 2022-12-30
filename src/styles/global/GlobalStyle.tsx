import { createGlobalStyle } from "styled-components";

// Pretendard
import PretendardBold from "../../static/fonts/PretendardBold.woff";
import PretendardMedium from "../../static/fonts/PretendardMedium.woff";
import PretendardRegular from "../../static/fonts/PretendardRegular.woff";

export const GlobalStyle = createGlobalStyle`
    @font-face {
            font-family: 'PretendardBold';
            src: local('PretendardBold'), local('PretendardBold');
            font-style: normal;
            src: url(${PretendardBold}) format('woff');
    }
    @font-face {
            font-family: 'PretendardRegular';
            src: local('PretendardRegular'), local('PretendardRegular');
            font-style: normal;
            src: url(${PretendardRegular}) format('woff');
    }
    @font-face {
            font-family: 'PretendardMedium';
            src: local('PretendardMedium'), local('PretendardMedium');
            font-style: normal;
            src: url(${PretendardMedium}) format('woff');
    }
`;
