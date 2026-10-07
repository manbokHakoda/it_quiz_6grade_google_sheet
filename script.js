// ==========================================
// GOOGLE APPS SCRIPT WEB APP URL
// ==========================================

const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbwTJBnhSE0E3SAZOeVU7BZeV_lptApfM_OXxfgcc9dExfWwmCmHznrn9nmlmxhUZSRd/exec";


// ==========================================
// 10 АСУУЛТ
//
// Зөв хариулт:
// 1Г  2В  3Б  4А  5Г
// 6В  7А  8Б  9В  10Г
//
// JavaScript index:
// А = 0
// Б = 1
// В = 2
// Г = 3
// ==========================================

const questions = [

    {
        q: "Мэдээллийн дүрслэл гэж юуг хэлэх вэ?",

        options: [
            "Зөвхөн текстээр мэдээллийг илэрхийлэх",
            "Компьютерийг унтраах",
            "Интернэт ашиглах",
            "Мэдээллийг зураг, тэмдэг, хүснэгт зэрэг хэлбэрээр илэрхийлэх"
        ],

        answer: 3
    },


    {
        q: "Өгөгдөл гэж юу вэ?",

        options: [
            "Зөвхөн компьютерийн дэлгэц",
            "Зөвхөн гарын товчлуур",
            "Боловсруулах, хадгалах, дамжуулах боломжтой мэдээллийн баримт, утга",
            "Компьютерийн цахилгаан утас"
        ],

        answer: 2
    },


    {
        q: "Зурагт мэдээлэл ямар хэлбэрээр дүрслэгдэж болох вэ?",

        options: [
            "Зөвхөн тоогоор",
            "Дүрс, зураг, график зэрэг хэлбэрээр",
            "Зөвхөн дуугаар",
            "Зөвхөн гарын товчлуураар"
        ],

        answer: 1
    },


    {
        q: "Компьютерийн дэлгэц дээрх жижиг дүрсийг юу гэж нэрлэдэг вэ?",

        options: [
            "Тэмдэгт дүрс (icon)",
            "Гар",
            "Принтер",
            "Кабель"
        ],

        answer: 0
    },


    {
        q: "Компьютер дээр зурагтай ажиллахад аль програм тохиромжтой вэ?",

        options: [
            "Calculator",
            "Clock",
            "Notepad",
            "Paint"
        ],

        answer: 3
    },


    {
        q: "Зургийг боловсруулахдаа ямар үйлдэл хийж болох вэ?",

        options: [
            "Зөвхөн компьютер унтраах",
            "Зөвхөн дуу сонсох",
            "Зурах, будах, хэсгийг дүүргэх, засварлах",
            "Зөвхөн файл хэвлэх"
        ],

        answer: 2
    },


    {
        q: "Paint програмд зураг зурахад аль хэрэгсэл ашиглагддаг вэ?",

        options: [
            "Brush (Бийр)",
            "Calculator",
            "Speaker",
            "Recycle Bin"
        ],

        answer: 0
    },


    {
        q: "Ctrl + S товчлуурын хослол ямар үүрэгтэй вэ?",

        options: [
            "Файлыг хаах",
            "Файлыг хадгалах",
            "Файлыг нээх",
            "Хайлт хийх"
        ],

        answer: 1
    },


    {
        q: "Компьютерт командыг гүйцэтгүүлэхэд аль нь зөв вэ?",

        options: [
            "Дэлгэцийг салгах",
            "Гарыг унтраах",
            "Командыг сонгож, шаардлагатай үйлдлийг хийх",
            "Компьютерийн кабелийг сугалж авах"
        ],

        answer: 2
    },


    {
        q: "Paint програмын аль хэрэгслээр өнгөөр будах боломжтой вэ?",

        options: [
            "Ctrl + F4",
            "Calculator",
            "File Explorer",
            "Pencil, Brush, Fill with Color"
        ],

        answer: 3
    }

];


// ==========================================
// VARIABLES
// ==========================================

let current = 0;

let seconds = 0;

let timerId = null;

let student = {
    name: "",
    className: ""
};


// ==========================================
// SHORTCUT
// ==========================================

const $ = id => document.getElementById(id);


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}


// ==========================================
// RENDER QUESTIONS
// А, Б, В, Г гэсэн тэмдэглэгээ
// ==========================================

function renderQuestions() {

    const letters = [
        "А",
        "Б",
        "В",
        "Г"
    ];


    $("quizForm").innerHTML =

        questions.map((q, i) => {

            return `

                <div
                    class="question ${
                        i === 0
                            ? "active"
                            : ""
                    }"
                >

                    <div class="question-card">

                        <div class="question-number">

                            Асуулт
                            ${i + 1}
                            /
                            ${questions.length}

                        </div>


                        <h2>

                            ${escapeHtml(q.q)}

                        </h2>


                        <div class="options">

                            ${q.options.map(
                                (option, j) => `

                                <label class="option">

                                    <input
                                        type="radio"
                                        name="question${i}"
                                        value="${j}"
                                    >

                                    <span class="option-letter">

                                        ${letters[j]}

                                    </span>

                                    <span class="option-text">

                                        ${escapeHtml(option)}

                                    </span>

                                </label>

                            `).join("")}

                        </div>

                    </div>

                </div>

            `;

        }).join("");
}


// ==========================================
// START QUIZ
// ==========================================

function startQuiz() {

    const name =
        $("studentName")
            .value
            .trim();


    const className =
        $("studentClass")
            .value;


    // НЭР ШАЛГАХ

    if (!name) {

        $("startError").textContent =
            "Сурагчийн нэрээ оруулна уу.";

        return;
    }


    // АНГИ ШАЛГАХ

    if (!className) {

        $("startError").textContent =
            "Ангиа сонгоно уу.";

        return;
    }


    // STUDENT DATA

    student = {

        name: name,

        className: className

    };


    // RESET

    current = 0;

    seconds = 0;


    // SCREEN

    $("startScreen")
        .classList
        .add("hidden");


    $("quizScreen")
        .classList
        .remove("hidden");


    // STUDENT INFO

    $("studentInfo")
        .textContent =
        `${student.name} — ${student.className}`;


    // QUESTIONS

    renderQuestions();


    // UI

    updateUI();


    // TIMER

    clearInterval(timerId);


    $("timer")
        .textContent =
        "00:00";


    timerId = setInterval(
        () => {

            seconds++;


            $("timer")
                .textContent =
                formatTime(seconds);

        },

        1000
    );

}


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(total) {

    const minutes =

        Math.floor(total / 60)

            .toString()

            .padStart(2, "0");


    const secondsPart =

        (total % 60)

            .toString()

            .padStart(2, "0");


    return `${minutes}:${secondsPart}`;
}


// ==========================================
// UPDATE UI
// ==========================================

function updateUI() {

    document
        .querySelectorAll(".question")
        .forEach(
            (element, index) => {

                element.classList.toggle(
                    "active",
                    index === current
                );

            }
        );


    // PROGRESS TEXT

    $("progressText")
        .textContent =
        `${current + 1} / ${questions.length}`;


    // PROGRESS BAR

    $("progressBar")
        .style
        .width =
        `${((current + 1) /
            questions.length) * 100}%`;


    // PREVIOUS BUTTON

    $("prevBtn")
        .disabled =
        current === 0;


    // LAST QUESTION

    if (
        current ===
        questions.length - 1
    ) {

        $("nextBtn")
            .classList
            .add("hidden");


        $("submitBtn")
            .classList
            .remove("hidden");

    }

    else {

        $("nextBtn")
            .classList
            .remove("hidden");


        $("submitBtn")
            .classList
            .add("hidden");

    }

}


// ==========================================
// SELECTED ANSWER
// ==========================================

function selectedAnswer(index) {

    const selected =

        document.querySelector(
            `input[name="question${index}"]:checked`
        );


    if (!selected) {

        return null;

    }


    return Number(
        selected.value
    );
}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    // ХАРИУЛСАН ЭСЭХ

    if (
        selectedAnswer(current) === null
    ) {

        $("quizError")
            .textContent =
            "Энэ асуултад хариулна уу.";

        return;
    }


    $("quizError")
        .textContent = "";


    // ДАРААГИЙН АСУУЛТ

    if (
        current <
        questions.length - 1
    ) {

        current++;

        updateUI();


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

}


// ==========================================
// PREVIOUS QUESTION
// ==========================================

function prevQuestion() {

    $("quizError")
        .textContent = "";


    if (current > 0) {

        current--;

        updateUI();


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

}


// ==========================================
// SUBMIT QUIZ
// ==========================================

function submitQuiz() {

    $("quizError")
        .textContent = "";


    // ======================================
    // UNANSWERED QUESTIONS
    // ======================================

    const unanswered = [];


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        if (
            selectedAnswer(i) === null
        ) {

            unanswered.push(i + 1);

        }

    }


    // ХАРИУЛААГҮЙ АСУУЛТ БАЙВАЛ

    if (
        unanswered.length > 0
    ) {

        $("quizError")
            .textContent =
            `Хариулаагүй асуулт: ${
                unanswered.join(", ")
            }.`;

        return;

    }


    // ======================================
    // SCORE
    // ======================================

    let score = 0;


    questions.forEach(
        (q, i) => {

            if (
                selectedAnswer(i) ===
                q.answer
            ) {

                score++;

            }

        }
    );


    // ======================================
    // PERCENT
    // ======================================

    const percent =

        Math.round(
            score /
            questions.length *
            100
        );


    // ======================================
    // DURATION
    // ======================================

    const duration =
        formatTime(seconds);


    // ======================================
    // GRADE
    // ======================================

    let grade;


    if (percent >= 90) {

        grade =
            "A — Маш сайн";

    }

    else if (percent >= 80) {

        grade =
            "B — Сайн";

    }

    else if (percent >= 70) {

        grade =
            "C — Дунд";

    }

    else if (percent >= 60) {

        grade =
            "D — Хангалттай";

    }

    else {

        grade =
            "F — Дахин давтах шаардлагатай";

    }


    // ======================================
    // MESSAGE
    // ======================================

    let message;


    if (percent >= 90) {

        message =
            "Маш сайн ажиллалаа! 🌟";

    }

    else if (percent >= 70) {

        message =
            "Сайн ажиллалаа! 👍";

    }

    else if (percent >= 50) {

        message =
            "Дахин давтаад үзээрэй. 📚";

    }

    else {

        message =
            "Хичээлээ дахин сайн давтаарай. 💪";

    }


    // ======================================
    // STOP TIMER
    // ======================================

    clearInterval(timerId);


    // ======================================
    // SHOW RESULT
    // ======================================

    showResult(

        score,

        percent,

        duration,

        grade,

        message

    );


    // ======================================
    // GOOGLE SHEETS DATA
    // ======================================

    const now =
        new Date();


    const payload = {

        name:
            student.name,

        className:
            student.className,

        score:
            score,

        total:
            questions.length,

        percent:
            percent,

        grade:
            grade,

        duration:
            duration,

        date:
            now.toLocaleString(
                "mn-MN"
            ),

        timestamp:
            now.toISOString()

    };


    // ======================================
    // SEND TO GOOGLE SHEETS
    // ======================================

    if (
        WEB_APP_URL &&
        !WEB_APP_URL.includes(
            "PASTE_YOUR"
        )
    ) {

        fetch(

            WEB_APP_URL,

            {

                method:
                    "POST",

                mode:
                    "no-cors",

                headers: {

                    "Content-Type":
                        "text/plain;charset=utf-8"

                },

                body:
                    JSON.stringify(
                        payload
                    )

            }

        )

        .then(() => {

            console.log(
                "Дүн Google Sheets рүү илгээгдлээ."
            );

        })

        .catch(error => {

            console.error(
                "Google Sheets алдаа:",
                error
            );

        });

    }

}


// ==========================================
// SHOW RESULT
// ==========================================

function showResult(

    score,

    percent,

    duration,

    grade,

    message

) {

    // QUIZ SCREEN HIDE

    $("quizScreen")
        .classList
        .add("hidden");


    // RESULT SCREEN SHOW

    $("resultScreen")
        .classList
        .remove("hidden");


    // SCORE

    $("scoreText")
        .textContent =
        `${score} / ${questions.length}`;


    // PERCENT

    $("percentText")
        .textContent =
        `${percent}%`;


    // NAME

    $("resultName")
        .textContent =
        student.name;


    // CLASS

    $("resultClass")
        .textContent =
        student.className;


    // TIME

    $("resultTime")
        .textContent =
        duration;


    // GRADE

    $("gradeText")
        .textContent =
        grade;


    // MESSAGE

    $("resultMessage")
        .textContent =
        message;


    // TOP

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// EVENTS
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    () => {


        // QUESTIONS

        renderQuestions();


        // START

        $("startBtn")
            .addEventListener(

                "click",

                startQuiz

            );


        // NEXT

        $("nextBtn")
            .addEventListener(

                "click",

                nextQuestion

            );


        // PREVIOUS

        $("prevBtn")
            .addEventListener(

                "click",

                prevQuestion

            );


        // SUBMIT

        $("submitBtn")
            .addEventListener(

                "click",

                submitQuiz

            );


        // CLEAR ERROR

        $("quizForm")
            .addEventListener(

                "change",

                () => {

                    $("quizError")
                        .textContent = "";

                }

            );

    }

);