import { useState } from "react";
import "./style.css";

const faqs = [
    {
        question: "Як працює прогноз попиту на кров?",
        answer: "Ми використовуємо нейромережу, яка аналізує фактори як день тижня, сезон, кількість операцій та донорів.",
    },
    {
        question: "Чи безпечно здавати кров?",
        answer: "Так! Донорство крові — це безпечна процедура, яка займає близько 10-15 хвилин.",
    },
    {
        question: "Чи можу я побачити свій внесок як донор?",
        answer: "Звісно! Ви отримаєте статистику, скільки разів та у котрі лікарні здавали кров.",
    },
    {
        question: "Як часто можна здавати кров?",
        answer: "Чоловіки — кожні 60 днів, жінки — кожні 90 днів.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <h1 className="faq-title">Часті питання</h1>
            <div className="faq-list">
                {faqs.map((item, index) => (
                    <div
                        className={`faq-item ${openIndex === index ? "open" : ""}`}
                        key={index}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">{item.question}</div>
                        <div className="faq-answer">{item.answer}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
