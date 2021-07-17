module.exports = {
    format_time: (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }

        return word;
    }

}


