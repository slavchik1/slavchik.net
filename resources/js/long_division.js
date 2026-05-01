function divide(
    x,
    y,
    repetitionLimit = 100,
    outputFractionDivider = ".",
    doLogDivisionIterations = false
) {
    const LEGAL_CHARS = "0123456789.";
    const showAlert = (message) => {
        if (typeof alert === "function") {
            alert(message);
        }
    };

    x = String(x).replaceAll(",", ".");
    y = String(y).replaceAll(",", ".");

    for (const char of x) {
        if (!LEGAL_CHARS.includes(char)) {
            const message = "Illegal characters was found in x: " + char;
            showAlert(message);
        throw new Error(message);
        }
    }

    for (const char of y) {
        if (!LEGAL_CHARS.includes(char)) {
            const message = "Illegal characters was found in y: " + char;
            showAlert(message);
            throw new Error(message);
        }
    }

    if ((x.match(/\./g) || []).length > 1) {
        const message = "Too many decimal separators in x";
        showAlert(message);
        throw new Error(message);
    }

    if ((y.match(/\./g) || []).length > 1) {
        const message = "Too many decimal separators in y";
        showAlert(message);
        throw new Error(message);
    }

    function toIntegerParts(number) {
        let integerPart;
        let fractionalPart;

        if (number.includes(".")) {
            [integerPart, fractionalPart] = number.split(".");
        } else {
            integerPart = number;
            fractionalPart = "";
        }

        if (integerPart === "") {
            integerPart = "0";
        }

        let digits = integerPart + fractionalPart;

        if (digits === "") {
            digits = "0";
        }

        return [BigInt(digits), fractionalPart.length];
    }

    const [xInteger, xDecimalDigits] = toIntegerParts(x);
    const [yInteger, yDecimalDigits] = toIntegerParts(y);

    if (yInteger === 0n) {
        const message = "Division by zero";
        showAlert(message);
        throw new Error(message);
    }

        const numerator = xInteger * 10n ** BigInt(yDecimalDigits);
            const denominator = yInteger * 10n ** BigInt(xDecimalDigits);

        const integerPart = numerator / denominator;
        let remainder = numerator % denominator;

        if (remainder === 0n) {
            return [String(integerPart), ""];
    }

    let fraction = "";
    const remainders = new Map();
    let repetitivePart = "";
    let i = 0;

    while (remainder !== 0n) {
        if (doLogDivisionIterations) {
            console.log("Division iteration #" + String(i));
            i += 1;
        }

        if (remainders.has(remainder)) {
            const repetitiveStart = remainders.get(remainder);
            repetitivePart = fraction.slice(repetitiveStart);
            fraction =
            fraction.slice(0, repetitiveStart) + "(" + repetitivePart + ")";
            break;
        }

        if (fraction.replaceAll("(", "").replaceAll(")", "").length >= repetitionLimit) {
            break;
        }

        remainders.set(remainder, fraction.length);

        remainder *= 10n;
        const fractionNumber = remainder / denominator;
        fraction += String(fractionNumber);
        remainder %= denominator;
        }

        return (String(integerPart) + "." + fraction).replaceAll(
        ".",
        outputFractionDivider
        );
    }







function executeDivision() {
    const x = document.getElementById('x').value;
    const y = document.getElementById('y').value;
    const limit = Number(document.getElementById('repetitionLimit').value);
    const divider = document.getElementById('outputFractionDivider').value;
    const doLog = document.getElementById('doLogDivisionIterations').checked;

    if (Number.isNaN(limit)) {
        alert("Repetition limit is not a number!");
        return
    }

    document.getElementById("output").innerText = divide(x, y, limit, divider, doLog);
}





if (typeof window !== "undefined") {
    window.divide = divide;
    window.executeDivision = executeDivision;
}
