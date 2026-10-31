package com.tattel.app.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.tattel.app.data.LessonRepository
import com.tattel.app.model.LessonResult
import com.tattel.app.ui.theme.*

@Composable
fun ExerciseScreen(
    onClose: () -> Unit,
    onFinished: (LessonResult) -> Unit
) {
    val questions = remember { LessonRepository.greetingsQuestions }
    var currentIndex by remember { mutableIntStateOf(0) }
    var selectedOption by remember { mutableStateOf<String?>(null) }
    var isAnswerChecked by remember { mutableStateOf(false) }
    var correctCount by remember { mutableIntStateOf(0) }
    var wrongCount by remember { mutableIntStateOf(0) }

    val currentQuestion = questions[currentIndex]
    val isCorrect = selectedOption == currentQuestion.correctAnswer

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(TatTelBackground)
            .statusBarsPadding()
            .navigationBarsPadding()
    ) {
        // Верхняя панель: закрыть + индикатор прогресса
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onClose) {
                Icon(
                    imageVector = Icons.Default.Close,
                    contentDescription = "Выйти из урока",
                    tint = TatTelDarkText
                )
            }

            Spacer(modifier = Modifier.width(8.dp))

            LinearProgressIndicator(
                progress = { (currentIndex + 1) / questions.size.toFloat() },
                modifier = Modifier
                    .weight(1f)
                    .height(8.dp)
                    .clip(RoundedCornerShape(4.dp)),
                color = TatTelGreenPrimary,
                trackColor = TatTelLightGreen,
            )

            Spacer(modifier = Modifier.width(16.dp))

            Text(
                text = "${currentIndex + 1}/${questions.size}",
                fontSize = 14.sp,
                fontWeight = FontWeight.Medium,
                color = TatTelMutedText
            )
        }

        // Центральная область с вопросом
        Column(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                text = "Выберите верный перевод",
                fontSize = 14.sp,
                color = TatTelMutedText,
                fontWeight = FontWeight.Medium
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Карточка татарского слова
            Card(
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, TatTelBorder),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 32.dp, horizontal = 24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = currentQuestion.tatarWord,
                        fontSize = 34.sp,
                        fontWeight = FontWeight.Bold,
                        color = TatTelGreenPrimary
                    )

                    Spacer(modifier = Modifier.height(6.dp))

                    Text(
                        text = currentQuestion.transcription,
                        fontSize = 16.sp,
                        color = TatTelMutedText
                    )
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // 4 варианта ответа
            Column(
                modifier = Modifier.fillMaxWidth(),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                currentQuestion.options.forEach { option ->
                    val isSelected = selectedOption == option
                    val isTargetAnswer = option == currentQuestion.correctAnswer

                    // Определение цвета карточки при проверке
                    val (cardBg, borderColor, textColor) = when {
                        !isAnswerChecked -> {
                            if (isSelected) {
                                Triple(TatTelLightGreen, TatTelGreenPrimary, TatTelGreenPrimary)
                            } else {
                                Triple(Color.White, TatTelBorder, TatTelDarkText)
                            }
                        }
                        isAnswerChecked && isTargetAnswer -> {
                            Triple(Color(0xFFD2E8D4), TatTelGreenPrimary, TatTelGreenPrimary)
                        }
                        isAnswerChecked && isSelected && !isCorrect -> {
                            Triple(Color(0xFFFFDAD6), Color(0xFFBA1A1A), Color(0xFFBA1A1A))
                        }
                        else -> {
                            Triple(Color.White, TatTelBorder.copy(alpha = 0.5f), TatTelDarkText.copy(alpha = 0.6f))
                        }
                    }

                    OutlinedButton(
                        onClick = {
                            if (!isAnswerChecked) {
                                selectedOption = option
                            }
                        },
                        shape = RoundedCornerShape(16.dp),
                        colors = ButtonDefaults.outlinedButtonColors(
                            containerColor = cardBg,
                            contentColor = textColor
                        ),
                        border = BorderStroke(1.5.dp, borderColor),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(56.dp)
                    ) {
                        Text(
                            text = option,
                            fontSize = 16.sp,
                            fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Normal
                        )
                    }
                }
            }
        }

        // Нижняя панель действий / результата
        Surface(
            color = if (isAnswerChecked) {
                if (isCorrect) Color(0xFFEBF4EA) else Color(0xFFFFECEB)
            } else Color.White,
            shadowElevation = 8.dp,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
            ) {
                if (isAnswerChecked) {
                    Text(
                        text = if (isCorrect) "Отлично! Верный ответ." else "Неверно. Правильно: ${currentQuestion.correctAnswer}",
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 15.sp,
                        color = if (isCorrect) TatTelGreenPrimary else Color(0xFFBA1A1A)
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                }

                Button(
                    onClick = {
                        if (!isAnswerChecked) {
                            if (selectedOption != null) {
                                isAnswerChecked = true
                                if (isCorrect) correctCount++ else wrongCount++
                            }
                        } else {
                            if (currentIndex + 1 < questions.size) {
                                currentIndex++
                                selectedOption = null
                                isAnswerChecked = false
                            } else {
                                onFinished(
                                    LessonResult(
                                        correctCount = correctCount,
                                        wrongCount = wrongCount,
                                        totalCount = questions.size
                                    )
                                )
                            }
                        }
                    },
                    enabled = selectedOption != null,
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (isAnswerChecked && !isCorrect) Color(0xFFBA1A1A) else TatTelGreenPrimary,
                        contentColor = Color.White
                    ),
                    shape = RoundedCornerShape(14.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(50.dp)
                ) {
                    Text(
                        text = if (!isAnswerChecked) "Проверить ответ" else if (currentIndex + 1 < questions.size) "Дальше" else "Завершить",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }
        }
    }
}
