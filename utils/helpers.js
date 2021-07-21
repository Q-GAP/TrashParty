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
    },
    if_eq: (a, b) => {
        if(a == b) {
            return true
        }
        else {
            return false
        }
    },
    stillGif: (gif) => {
        return gif.replace("200.gif", "200_s.gif")
    }
}


