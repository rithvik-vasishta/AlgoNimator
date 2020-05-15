import React from 'react';
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/MergeSort';
import {getHeapSortAnimations} from '../SortingAlgorithms/HeapSort';
import {getQuickSortAnimations} from '../SortingAlgorithms/QuickSort';
import {getInsertionSortAnimations} from '../SortingAlgorithms/InsertionSort';
import {getSelectionSortAnimations} from '../SortingAlgorithms/SelectionSort';
import {getBubbleSortAnimations} from '../SortingAlgorithms/BubbleSort';
import '../App.css'
//Changing width,height accordingly with the browser
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 200)/8);

function reportWindowSize() {
    WINDOW_WIDTH =  window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 200)/8);
}
window.onresize = reportWindowSize; //TBD -> find a way to update state also when resized


const PRIMARY_COLOR = 'turquoise'; //Normal color of bars
const SECONDARY_COLOR = 'red'; //Color of bars when they are being compared
const ANIMATION_SPEED_MS = 10; //Animation Speed (how fast color changes, how fast height gets overwritten)

//Tooltips for buttons
const DISABLED_BUTTON = "Currently Disabled"
const ENABLED_BUTTON = {
    nlogn: "O(NlogN) Time Complexity",
    nSquare: "O(N^2) Time Complexity"
}

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        };
    }
    componentDidMount() {
        this.resetArray();
    }
    //Generates new random array 
    resetArray() {
        const array = []
        for (let i = 0;i < NUMBER_OF_ARRAY_BARS;i++) {
            array.push(randomIntFromInterval(25,WINDOW_HEIGHT-30));
        }
        this.setState({array: array});
        this.restoreStoreButtons();
    }
    disableSortButtons() {
        document.getElementById("mergeSort").disabled = true;
        let buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("quickSort").disabled = true;
        buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("insertionSort").disabled = true;
        buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        

        document.getElementById("selectionSort").disabled = true;
        buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";

        document.getElementById("bubbleSort").disabled = true;
        buttonStyle = document.getElementById("bubbleSort").style;
        document.getElementById("bubbleSort").title = DISABLED_BUTTON;
        buttonStyle.cursor = "default";
        buttonStyle.background = "#000000";
    }
    restoreStoreButtons() {
        document.getElementById("mergeSort").disabled = false;
        let buttonStyle = document.getElementById("mergeSort").style;
        document.getElementById("mergeSort").title = ENABLED_BUTTON.nlogn;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("quickSort").disabled = false;
        buttonStyle = document.getElementById("quickSort").style;
        document.getElementById("quickSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("bubbleSort").disabled = false;
        buttonStyle = document.getElementById("bubbleSort").style;
        document.getElementById("bubbleSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("selectionSort").disabled = false;
        buttonStyle = document.getElementById("selectionSort").style;
        document.getElementById("selectionSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        document.getElementById("insertionSort").disabled = false;
        buttonStyle = document.getElementById("insertionSort").style;
        document.getElementById("insertionSort").title = ENABLED_BUTTON.nSquare;
        buttonStyle.background = "#47535E";
        buttonStyle.cursor = "pointer";

        
    }
    //Sorting Algorithms
    mergeSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 3 !== 2);
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const color = (i % 3 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                //If we don't multiply by the index then every animations[i] wait for exactly ANIMATION_SPEED_MS and immediately change into final state
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
                
            }
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                  },i * ANIMATION_SPEED_MS);
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
    }
    quickSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length - 1; i++) {
            const isColorChange = (i % 6 === 0) || (i % 6 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (i % 6 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIndex, barTwoIndex] = animations[i];
                if(barOneIndex === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);  
    }
    bubbleSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (i % 4 === 0) || (i % 4 === 1);
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIndex, newHeight] = animations[i];
                if (barIndex === -1) {
                    continue;
                }
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME);  
    }
    insertionSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getInsertionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
    }
    selectionSort() {
        this.disableSortButtons();
        const [animations,sortArray] = getSelectionSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = (animations[i][0] === "comparision1") || (animations[i][0] === "comparision2");
            const arrayBars = document.getElementsByClassName('array-bar');
            if(isColorChange === true) {
                const color = (animations[i][0] === "comparision1") ? SECONDARY_COLOR : PRIMARY_COLOR;
                const [temp, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },i * ANIMATION_SPEED_MS);
            }
            else {
                const [temp, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                },i * ANIMATION_SPEED_MS);  
            }
        }
        // this.setState({array: sortArray})
        const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS*animations.length/2 + 3000);
        setTimeout(() => this.restoreStoreButtons(), RESTORE_TIME); 
    }
    render() {
        const array = this.state.array;
        const SORT_BUTTONS = 6;
        const TOTAL_BUTTONS = 1 + SORT_BUTTONS;
        return(
            <>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                  <a class="navbar-brand" href="/">Algonimator</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>

                  <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item active">
                        <a class="nav-link" href="/">Home </a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" title="Generate Random Array" href="#" onClick={() => this.resetArray()}>Generate New Array</a>
                      </li>
                      <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Algorithm Selection
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a class="dropdown-item" id="mergeSort" href="#" title="O(NlogN) Time Complexity" onClick={() => this.mergeSort()}>Merge Sort</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" id="quickSort" href="#" title="O(NlogN) Time Complexity" onClick={() => this.quickSort()}>Quick Sort</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" id="bubbleSort" href="#" title="O(N^2) Time Complexity" onClick={() => this.bubbleSort()}>Bubble Sort</a>
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" id="insertionSort" href="#" title="O(N^2) Time Complexity" onClick={() => this.insertionSort()}>Insertion Sort</a>
                          <div class="dropdown-divider"></div>
                          
                          <div class="dropdown-divider"></div>
                          <a class="dropdown-item" id="selectionSort" href="#" title="O(N^2) Time Complexity" onClick={() => this.selectionSort()}>Selection Sort</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
            <div className="array-container" style={{position:'absolute', right:`20px`}}>
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`
                        }}
                    ></div>
                ))}
            </div> 
            </>
        );
    }
}


function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;


