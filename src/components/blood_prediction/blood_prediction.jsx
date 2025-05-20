import axios from 'axios';
import { useState } from 'react';
import PropTypes from "prop-types";
import './style.css';

export default function PredictionForm() {
    const [formData, setFormData] = useState({
        month: 0,
        region: 0,
        year: 2024,
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
                month: formData.month,
                region: formData.region,
                year: formData.year,
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

            <SelectInput
                label="Місяць"
                name="month"
                value={formData.month}
                onChange={handleChange}
                options={['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд']}
            />
            <SelectInput
                label="Регіон"
                name="region"
                value={formData.region}
                onChange={handleChange}
                options={['Київ', 'Львів', 'Тернопіль']}
            />
            <SelectInput
                label="Рік"
                name="year"
                value={formData.year}
                onChange={handleChange}
                options={['2023', '2024', '2025']}
            />

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
            <select name={name} value={value} onChange={onChange} className="select-field">
                {options.map((opt, idx) => (
                    <option key={idx} value={name === 'year' ? parseInt(opt) : idx}>
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