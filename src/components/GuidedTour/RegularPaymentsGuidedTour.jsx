import React, { useEffect } from 'react';
import IntroJs from 'intro.js';
import 'intro.js/introjs.css';
import { useGlobalContext } from '../../context/globalContext';

function GuidedTour() {
    const { language } = useGlobalContext();
    useEffect(() => {
        const tour = IntroJs();

        tour.setOptions({
            steps: [
                {
                    title: language === 'Portuguese' ? 'Adicionar pagamento regular' : 'Add regular payment',
                    element: document.querySelector('.payment-form-container'),
                    intro: language === 'Portuguese' ? 'Aqui pode adicionar um pagamento regular' : 'Here you can add a regular payment',
                },
                {
                    title: language === 'Portuguese' ? 'Histórico de pagamentos regulares' : 'Regular payment history',
                    element: document.querySelector('.payment'),
                    intro: language === 'Portuguese' ? 'Aqui pode ver o histórico de pagamentos regulares' : 'Here you can check your regular payments history',
                },
                {
                    title: language === 'Portuguese' ? 'Editar pagamento regular' : 'Edit regular payment',
                    element: document.querySelector('.btn-con-edit'),
                    intro: language === 'Portuguese' ? 'Aqui pode editar um pagamento regular' : 'Here you can edit your regular payment',
                },
                {
                    title: language === 'Portuguese' ? 'Excluir pagamento regular' : 'Delete regular payment',
                    element: document.querySelector('.btn-con-delete'),
                    intro: language === 'Portuguese' ? 'Aqui pode excluir um pagamento regular' : 'Here you can delete your regular payment',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
