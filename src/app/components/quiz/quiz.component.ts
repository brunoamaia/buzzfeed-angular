import { Component, OnInit } from '@angular/core';
import quiz_questions from "../../../assets/data/quiz_questions.json"

type QuestionType = {
  id: number;
  question: string;
  options: Array<{
    id: number;
    name: string;
    alias: string;
  }>
}

type QuizDataType = {
  title: string;
  questions: QuestionType[];
  results: {
    A: string;
    B: string;
  }
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  answers:string[] = []
  answerSelected:string = ""
  finished:boolean = false
  importedDataWithTypes: QuizDataType = quiz_questions
  questions:any
  questionIndex:number = 0
  questionMaxIndex:number = 0
  questionSelected:any
  title:string = ""

  constructor() { }

  ngOnInit(): void {
    if(this.importedDataWithTypes){
      this.finished = false
      this.title = this.importedDataWithTypes.title

      this.questions = this.importedDataWithTypes.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    } else {
      console.log('Ops...')
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = this.importedDataWithTypes.results[finalAnswer as keyof typeof this.importedDataWithTypes.results ]
    }
  }

  async checkResult(answers:string[]){

    const result = answers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }
}
