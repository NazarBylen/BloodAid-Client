import axios from 'axios';
import { useState } from 'react';
import PropTypes from "prop-types";

import './style.css'

export default function PredictionForm() {
    const [formData, setFormData] = useState({
        day_of_week: 0,
        season: 0,
        holidays: 0,
        accidents: 0,
        operations: 0,
        donors: 0,
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
        const input = [
            formData.day_of_week,
            formData.season,
            formData.holidays,
            formData.accidents,
            formData.operations,
            formData.donors,
        ];

        try {
            const response = await axios.post('http://localhost:3001/api/predict', { input });
            setResult(response.data.prediction);
        } catch (error) {
            console.error('Помилка при запиті:', error);
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
                <NumberInput label="Нещасні випадки" name="accidents" value={formData.accidents} onChange={handleChange} />
                <NumberInput label="Операції" name="operations" value={formData.operations} onChange={handleChange} />
                <NumberInput label="Кількість донорів" name="donors" value={formData.donors} onChange={handleChange} />
            </div>

            <button onClick={handlePredict} className="predict-button">
                Прогноз
            </button>

            {result !== null && (
                <p className="result-text">
                    Очікуваний попит: <span className="result-value">{result.toFixed(2)} літрів</span>
                </p>
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

function NumberInput({ label, name, value, onChange }) {
    return (
        <div className="input-group">
            <label className="input-label">{label}</label>
            <input
                type="number"
                name={name}
                value={value}
                onChange={onChange}
                className="input-field"
            />
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

NumberInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

