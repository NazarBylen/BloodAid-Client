import { useState } from 'react';
import PropTypes from 'prop-types';

const DatePicker = ({ onSubmit }) => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleSubmit = () => {
        if (selectedDate) {
            onSubmit(selectedDate);
        }
    };

    return (
        <div>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button className="close-button" onClick={handleSubmit}>Confirm</button>
        </div>
    );
};

DatePicker.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default DatePicker;
