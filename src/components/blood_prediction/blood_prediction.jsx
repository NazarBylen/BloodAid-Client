import axios from 'axios';
import { useState } from 'react';
import PropTypes from "prop-types";

import './style.css'

export default function PredictionForm() {
    const [formData, setFormData] = useState({
        day_of_week: 0,
        season: 0,
        holidays: 0,
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseInt(value),
        });
    };

    const handlePredict = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/blood-prediction/predict', {
                day_of_week: formData.day_of_week,
                season: formData.season,
                holidays: formData.holidays,
            });
            setResult(response.data);
        } catch (error) {
            console.error('Помилка при запиті:', error);
            setResult(null);
        }
    };

    return (
        <div className="prediction-container">
            <h2 className="prediction-title">Прогноз попиту на кров</h2>

            <div>
                <SelectInput
                    label="День тижня"
                    name="day_of_week"
                    value={formData.day_of_week}
                    onChange={handleChange}
                    options={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']}
                />
                <SelectInput
                    label="Пора року"
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    options={['Зима', 'Весна', 'Літо', 'Осінь']}
                />
                <SelectInput
                    label="Святковий день?"
                    name="holidays"
                    value={formData.holidays}
                    onChange={handleChange}
                    options={['Ні', 'Так']}
                />
            </div>

            <button onClick={handlePredict} className="predict-button">
                Прогноз
            </button>

            {result && (
                <div className="result-text">
                    <p>Очікуваний попит: <span className="result-value">{result.demand.toFixed(2)} літрів</span></p>
                    <p>Нещасні випадки: {result.accidents.toFixed(2)}</p>
                    <p>Операції: {result.operations.toFixed(2)}</p>
                    <p>Кількість донорів: {result.donors.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

function SelectInput({ label, name, value, onChange, options }) {
    return (
        <div className="input-group">
            <label className="input-label">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="select-field"
            >
                {options.map((opt, idx) => (
                    <option key={idx} value={idx}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

SelectInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
