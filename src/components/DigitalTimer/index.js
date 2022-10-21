// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimit: 25,
  timeElapsed: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickDecreaseTimer = () => {
    const {timerLimit} = this.state

    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onClickIncreaseTimer = () =>
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))

  renderTimeLimitController = () => {
    const {timerLimit, timeElapsed} = this.state
    const isButtonDisabled = timeElapsed > 0

    return (
      <div className="time-limit-control-container">
        <p className="time-limit-control-label">Set Timer Limit</p>
        <div className="timer-limit-control">
          <button
            type="button"
            disabled={isButtonDisabled}
            className="limit-control-button"
            onClick={this.onClickDecreaseTimer}
          >
            -
          </button>
          <div className="limit-label-timer-control-container">
            <p className="limit-timer-label">{timerLimit}</p>
          </div>
          <button
            type="button"
            disabled={isButtonDisabled}
            className="limit-control-button"
            onClick={this.onClickIncreaseTimer}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimit, timeElapsed} = this.state
    const isTimerCompleted = timeElapsed === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsed: prevState.timeElapsed + 1,
      }))
    }
  }

  onClickStartOrPause = () => {
    const {isTimerRunning, timeElapsed, timerLimit} = this.state
    const isTimerCompleted = timeElapsed === timerLimit * 60

    if (isTimerCompleted) {
      this.setState({timeElapsed: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimeController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-controller-container">
        <button
          type="button"
          className="timer-control-button"
          onClick={this.onClickStartOrPause}
        >
          <img
            src={startOrPauseImgUrl}
            alt={startOrPauseAltText}
            className="image-icon"
          />
          <p className="timer-control-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          type="button"
          className="timer-control-button"
          onClick={this.onClickReset}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="image-icon"
            alt="reset icon"
          />
          <p className="timer-control-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimit, timeElapsed} = this.state
    const totalRemainingSeconds = timerLimit * 60 - timeElapsed
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-running">{labelText}</p>
            </div>
            <div className="control-container">
              {this.renderTimeController()}
              {this.renderTimeLimitController()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
