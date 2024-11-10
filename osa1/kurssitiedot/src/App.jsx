
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.contents[0].part} exercises={props.contents[0].exercises} />
      <Part part={props.contents[1].part} exercises={props.contents[1].exercises} />
      <Part part={props.contents[2].part} exercises={props.contents[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.totalExercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const contents = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total totalExercises={contents[0].exercises + contents[1].exercises + contents[2].exercises} />
    </div>
  )
}

export default App