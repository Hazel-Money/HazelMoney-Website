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
                    title: language === 'Portuguese' ? 'Adicionar categoria' : 'Add category',
                    element: document.querySelector('.category-form-inputs'),
                    intro: language === 'Portuguese' ? 'Aqui pode adicionar uma categoria' : 'Here you can add a category',
                },
                {
                    title: 'Select icon',
                    element: document.querySelector('.icon-selection'),
                    intro: 'Here you can select an icon for your category',
                },
                {
                    title: 'Preview section',
                    element: document.querySelector('.preview-section'),
                    intro: 'Here you can check what is your icon looking like',
                },
            ]
        });

        tour.start();
    }, []);
}

export default GuidedTour;
