import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {start: false, minutes: 25, elapsedSeconds: 0}

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseMinutes = () => {
    const {minutes} = this.state

    if (minutes > 1) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onIncreaseMinutes = () =>
    this.setState(prevState => ({
      minutes: prevState.minutes + 1,
    }))

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({start: false, minutes: 25, elapsedSeconds: 0})
  }

  decrementTimeInterval = () => {
    const {minutes, elapsedSeconds} = this.state
    const isTimer = minutes - elapsedSeconds / 60

    if (isTimer === 0) {
      this.clearTimerInterval()
      this.setState({start: false})
    } else {
      this.setState(prevState => ({
        elapsedSeconds: prevState.elapsedSeconds + 1,
      }))
    }
  }

  onToggleTimer = () => {
    const {start, minutes, elapsedSeconds} = this.state

    const isTimer = minutes - elapsedSeconds / 60

    if (isTimer === 0) {
      this.setState({elapsedSeconds: 0})
    }
    if (start === true) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.decrementTimeInterval, 1000)
    }
    this.setState(prevState => ({start: !prevState.start}))
  }

  getDigitalFormateTime = () => {
    const {minutes, elapsedSeconds} = this.state

    const remainingTime = minutes * 60 - elapsedSeconds
    const remainingMinutes = Math.floor(remainingTime / 60)
    const remainingSeconds = Math.floor(remainingTime - remainingMinutes * 60)
    const formateMinutes =
      remainingMinutes > 9 ? remainingMinutes : `0${remainingMinutes}`
    const formateSeconds =
      remainingSeconds > 9 ? remainingSeconds : `0${remainingSeconds}`

    return `${formateMinutes}:${formateSeconds}`
  }

  render() {
    const {start, minutes, elapsedSeconds} = this.state
    const digitalFormateTime = this.getDigitalFormateTime()
    const isButtonDisable = elapsedSeconds > 0

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer">{digitalFormateTime}</h1>
              <p className="timer-status">{start ? 'running' : 'Paused'}</p>
            </div>
          </div>
          <div className="set-time-container">
            <div className="start-reset-container">
              <div className="start-container">
                <button
                  onClick={this.onToggleTimer}
                  className="start-btn"
                  type="button"
                >
                  <img
                    className="set-time-icons"
                    src={
                      start
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={start ? 'Pause icon' : 'play icon'}
                  />
                  <p className="set-time-paragraph">
                    {start ? 'Pause' : 'Start'}
                  </p>
                </button>
              </div>
              <div className="start-container">
                <button
                  onClick={this.onResetTimer}
                  className="start-btn"
                  type="button"
                >
                  <img
                    className="set-time-icons"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  <p className="set-time-paragraph">Reset</p>
                </button>
              </div>
            </div>
            <p className="time-limit-paragraph">Set Timer Limit</p>
            <div className="setting-time-display-container">
              <button
                onClick={this.onDecreaseMinutes}
                disabled={isButtonDisable}
                className="increase-btn"
                type="button"
              >
                -
              </button>
              <p className="set-timer-display">{minutes}</p>
              <button
                onClick={this.onIncreaseMinutes}
                disabled={isButtonDisable}
                className="increase-btn"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
