package com.tattel.app.data

import com.tattel.app.model.Lesson
import com.tattel.app.model.Question

object LessonRepository {
    // Вопросы первого урока строго по заданию (5 слов)
    val greetingsQuestions = listOf(
        Question(
            id = "q1",
            tatarWord = "Исәнме",
            transcription = "[исэнме́]",
            correctAnswer = "Привет",
            options = listOf("Привет", "Спасибо", "Да", "Нет")
        ),
        Question(
            id = "q2",
            tatarWord = "Рәхмәт",
            transcription = "[рэхмә́т]",
            correctAnswer = "Спасибо",
            options = listOf("До свидания", "Спасибо", "Привет", "Нет")
        ),
        Question(
            id = "q3",
            tatarWord = "Әйе",
            transcription = "[әйе́]",
            correctAnswer = "Да",
            options = listOf("Нет", "Спасибо", "Да", "Привет")
        ),
        Question(
            id = "q4",
            tatarWord = "Юк",
            transcription = "[юк]",
            correctAnswer = "Нет",
            options = listOf("Да", "До свидания", "Нет", "Спасибо")
        ),
        Question(
            id = "q5",
            tatarWord = "Сау бул",
            transcription = "[сау бу́л]",
            correctAnswer = "До свидания",
            options = listOf("Привет", "До свидания", "Спасибо", "Да")
        )
    )

    // Тематические уроки
    val lessons = listOf(
        Lesson(
            id = "greetings",
            title = "Приветствия",
            subtitle = "Базовые слова для первого контакта",
            isAvailable = true,
            wordCount = 5,
            questions = greetingsQuestions
        ),
        Lesson(
            id = "acquaintance",
            title = "Знакомство",
            subtitle = "Как представиться и спросить имя",
            isAvailable = false,
            wordCount = 5,
            questions = emptyList()
        ),
        Lesson(
            id = "family",
            title = "Семья",
            subtitle = "Близкие люди и родственники",
            isAvailable = false,
            wordCount = 5,
            questions = emptyList()
        ),
        Lesson(
            id = "food",
            title = "Еда",
            subtitle = "Блюда татарской кухни и напитки",
            isAvailable = false,
            wordCount = 5,
            questions = emptyList()
        ),
        Lesson(
            id = "daily_life",
            title = "Повседневная жизнь",
            subtitle = "Полезные фразы на каждый день",
            isAvailable = false,
            wordCount = 5,
            questions = emptyList()
        )
    )
}
