package com.tattel.app.model

data class Question(
    val id: String,
    val tatarWord: String,
    val transcription: String,
    val correctAnswer: String,
    val options: List<String>
)

data class Lesson(
    val id: String,
    val title: String,
    val subtitle: String,
    val isAvailable: Boolean,
    val wordCount: Int,
    val questions: List<Question>
)

data class LessonResult(
    val correctCount: Int,
    val wrongCount: Int,
    val totalCount: Int
)
