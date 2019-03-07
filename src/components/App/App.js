import React, { Component } from 'react';
import * as firebase from 'firebase';
import Chart from 'src/components/Chart/Chart';

import { RowBox, ColBox } from 'src/components/Box/Box';

import styles from './App.module.scss';

class App extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      data: [],
      totalScore: {
        jonas: 0,
        rasmus: 0
      },
      gamesPlayed: 0,
      currentStreak: {
        name: '...',
        streak: 0
      },
      longestStreak: {
        name: '...',
        streak: 0
      },
      bestWin: {
        jonas: 0,
        rasmus: 0,
        timestamp: "2018-04-13T17:59:33+02:00"
      }
    }
  }

  componentDidMount() {
    firebase.database().ref('results').on('child_added', (firebaseData) => {

      this.setState((prevState, props) => {
        const gamesPlayed = prevState.gamesPlayed + 1;

        const totalScore = {
          jonas: prevState.totalScore.jonas + firebaseData.val().jonas,
          rasmus: prevState.totalScore.rasmus + firebaseData.val().rasmus,
        }

        const winner = firebaseData.val().jonas > firebaseData.val().rasmus ? 'jonas' : 'rasmus';

        const currentStreak = { name: winner, streak: 1};
        if (prevState.currentStreak.name === winner) {
          currentStreak.streak += prevState.currentStreak.streak
        }

        const win = Math.abs(firebaseData.val().jonas - firebaseData.val().rasmus);
        let bestWin = prevState.bestWin;
        if (win > Math.abs(prevState.bestWin.jonas - prevState.bestWin.rasmus)) {
          bestWin = firebaseData.val();
        }

        return {
          gamesPlayed,
          totalScore,
          currentStreak,
          longestStreak: prevState.longestStreak.streak < currentStreak.streak ? { ...currentStreak } : prevState.longestStreak,
          bestWin,
          data: [...prevState.data, {
            game: gamesPlayed,
            jonas: firebaseData.val().jonas,
            rasmus: firebaseData.val().rasmus,
            jonasTotal: totalScore.jonas,
            rasmusTotal: totalScore.rasmus
          }]
        }
      })
    })
  }

  fakeAddition() {
    this.setState((prevState, props) => {
      const sweeps = Math.floor(Math.random() * 8);
      const totalPoints = 11 + sweeps;
      const jonas = Math.floor(Math.random() * (totalPoints + 1));
      const rasmus = totalPoints - jonas;

      const gamesPlayed = prevState.gamesPlayed + 1;
      const totalScore = {
        jonas: prevState.totalScore.jonas + jonas,
        rasmus: prevState.totalScore.rasmus + rasmus,
      }

      return {
        gamesPlayed,
        totalScore,
        data: [...prevState.data, {
          game: gamesPlayed,
          jonas: jonas,
          rasmus: rasmus,
          jonasTotal: totalScore.jonas,
          rasmusTotal: totalScore.rasmus
        }]
      }
    })
  }

  render() {
    return (
      <ColBox>
        { this.state.data.length ? <Chart data={ this.state.data }/> : 'Loading...'}
        {/* <div onClick={() => this.fakeAddition() }>FAKE!</div> */}
        <RowBox spacebetween>
          <ColBox>
            <RowBox>Best win</RowBox>
            <RowBox>Jonas: { this.state.bestWin.jonas }</RowBox>
            <RowBox>Rasmus: { this.state.bestWin.rasmus }</RowBox>
          </ColBox>
          <ColBox>
            <RowBox>Longest streak</RowBox>
            <RowBox>{ this.state.longestStreak.name }</RowBox>
            <RowBox>{ this.state.longestStreak.streak }</RowBox>
          </ColBox>
        </RowBox>
      </ColBox>
    );
  }
}

export default App;
