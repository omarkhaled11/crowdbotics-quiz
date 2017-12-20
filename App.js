import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from 'react-native'
import { getQuestions } from './service'
import QuestionComponent from './components/QuestionComponent'
const { width } = Dimensions.get('window')

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      quizStarted: false,
      isLoading: false,
      questions: [],
      answers: {},
      score: 0
    }
  }

  startQuiz = () => {
    this.setState({ isLoading: true }, this.getQuestions)
  }

  getQuestions = () => {
    getQuestions().then(questions =>
      this.setState({ questions, isLoading: false, quizStarted: true })
    )
  }

  setScore = (question, answer) => {
    this.setState({ answers: { ...this.state.answers, [question]: answer } })
  }

  getScore = () => {
    let score = 0
    Object.keys(this.state.answers).forEach(key => {
      console.log(this.state.answers[key])
      if (this.state.answers[key]) {
        score++
      }
    })
    console.log(this.state.answers)
    this.setState({ score })
  }

  render () {
    if (!this.state.quizStarted) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.startQuiz}>
            {this.state.isLoading
              ? <ActivityIndicator style={{ paddingHorizontal: 30 }} />
              : <Text style={styles.buttonText}>Start Quiz!</Text>}
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.questionsContainer}>
        <ScrollView contentContainerStyle={{ width, paddingBottom: 50 }}>
          {this.state.questions.map(item => (
            <QuestionComponent
              setScore={this.setScore}
              key={item.question}
              questions={item}
            />
          ))}
        </ScrollView>
        <View style={styles.resultView}>
          <TouchableOpacity
            style={[styles.button, { borderRadius: 0 }]}
            onPress={this.getScore}
          >
            <Text style={styles.buttonText}>Show result!</Text>
          </TouchableOpacity>
          <View style={styles.scoreView}>
            <Text>{this.state.score} / 10</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    backgroundColor: '#443d71',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  questionsContainer: {
    marginTop: 21,
    backgroundColor: '#F5FCFF',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  resultView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    height: 50,
    bottom: 0,
    left: 0,
    right: 0
  },
  scoreView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
    width: 70
  }
})
