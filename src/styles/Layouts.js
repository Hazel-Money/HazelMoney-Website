import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 1000px) {
        padding: 0;
        gap: 0;
        width: 100%;
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;
`;