import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native'
const { width } = Dimensions.get('window')

const IMAGES = {
  checked: require('../images/dot1.png'),
  unchecked: require('../images/dot1-grey.png')
}

const AnswerItem = ({ setCurrentAnswer, currentAnswer, answer }) => (
  <TouchableOpacity
    onPress={() => setCurrentAnswer(answer)}
    style={styles.answersContainer}
  >
    <Text style={styles.answerText}>{answer}</Text>
    <Image
      source={currentAnswer === answer ? IMAGES.checked : IMAGES.unchecked}
    />
  </TouchableOpacity>
)

export default class QuestionComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentAnswer: '',
      correctAnswer: this.props.questions.correctAnswer
    }
  }

  setCurrentAnswer = answer => {
    this.setState({ currentAnswer: answer })
    this.props.setScore(
      this.props.questions.question,
      this.state.currentAnswer === this.props.questions.correctAnswer
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {this.props.questions.question}
          </Text>
        </View>
        {this.props.questions.answers.map(item => (
          <AnswerItem
            key={item}
            setCurrentAnswer={this.setCurrentAnswer}
            answer={item}
            currentAnswer={this.state.currentAnswer}
          />
        ))}
        <View style={styles.borderView} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  questionContainer: {
    width: width,
    padding: 20
  },
  borderView: {
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    width: width / 1.3
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  answersContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    paddingVertical: 10
  },
  answerText: {
    fontSize: 14
  }
})
