import axios from 'axios'
import shuffle from 'lodash.shuffle'

export const getQuestions = () => {
  return axios
    .get('https://opentdb.com/api.php?amount=10')
    .then(function (response) {
      if (response.status === 200) {
        return response.data.results.map(item => ({
          question: item.question,
          answers: shuffle([...item.incorrect_answers, item.correct_answer]),
          correctAnswer: item.correct_answer
        }))
      } else {
        return []
      }
    })
    .catch(function (error) {
      console.log(error)
      return []
    })
}
