import React from "react";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import Navbar from "../Components/Navbar";
import * as chat from "../Constants/ChatConstants";
import ChatActions from "../Actions/ChatActions";



// TESTING
import ChatBar from "../Components/chatBar";

// CSS
import "../bulma.css";
import "../css/view__play.css";

class PlayView extends React.Component {
  constructor(props){
      super(props);
      
      this.state = {
        nums: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]
      }
  }

  render(){
    return(
      <div className="columns is-marginless __page">
        {/* COL 3 */}
        <ChatBar/>

        <div className="column is-paddingless main">
            <Navbar />
            {/* <h1 className="title has-text-weight-bold main__r__digital_2">Roulette</h1> */}
            <div className="main__r__timebar">
              {/* <div className="main__r__timebar__content"
                   style={timer_percentage}>
              </div> */}
            </div>

            <div className="main__r__boxes">
              <div className="main__r__boxes__container">
              {
                  this.state.nums.map((box) => {
                    if(box == 0) {
                      return(
                        <div className="main__r__box __green">
                          {box}
                        </div>
                      );
                    } else if (box % 2 == 0) {
                        return(
                          <div className="main__r__box __red">
                            {box}
                          </div>
                        );
                    } else {
                        return(
                          <div className="main__r__box __black">
                            {box}
                          </div>
                        );
                    }
                  })
                }
              </div>
            </div>

            <div className="columns is-marginless">
              
              <div className="column is-one-third main__r__cols">
                <h1 className="
                  has-text-white 
                  main__r__cols__button
                  __red
                  is-size-6">1-7, Win x2</h1>

                  <div className="main__r__entries">
                    <table className="table is-fullwidth">
                      <thead>
                        <tr>
                          <td>Icon</td>
                          <td>Username</td>
                          <td>Amount</td>
                        </tr>
                      </thead>  

                      <tbody>
                        {/* {this.state.nums.map((players, index) => {
                          return(
                            <tr>
                              <td></td>
                              <td>User#{index}</td>
                              <td>144,223</td>
                            </tr>
                          );
                        })} */}
                      </tbody>
                    </table>
                  </div>
              </div>
            
              <div className="column is-one-third main__r__cols">
                <h1 className="
                  has-text-white
                  main__r__cols__button
                  __green
                  is-size-6">0, Win x14</h1>
              </div>

              <div className="column is-one-third main__r__cols">
                <h1 className="
                  has-text-white
                  main__r__cols__button
                  __black
                  
                  is-size-6">8-14, Win x2</h1>
              </div>

          </div>
        </div>


      </div>    
    );
  }
}

export default PlayView;
