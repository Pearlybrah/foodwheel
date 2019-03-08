import React from "react";
import "./style.css";
import "./Winwheel";

//<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script> is saved in the HTML public folder
//Settings of Inner Wheel
let innerWheel = new Winwheel({
    'numSegments' : 4,
    'outerRadius' : 110,        // Set the outer radius to make the wheel smaller than the outer wheel.
    'segments': [
        {'fillStyle' : '#4DB6AC', 'text' : 'French'},
        {'fillStyle' : '#3949AB', 'text' : 'Italian'},
        {'fillStyle' : '#1DE9B6', 'text' : 'Mexican'},
        {'fillStyle' : '#FFFF00', 'text' : 'Chinese'}
    ]
});

//Settings of Outer wheel
let outerWheel = new Winwheel({
    'numSegments': 16,
    'textMargin' : 0,
    'outerRadius' : 210,
    'innerRadius' : 110,    // Set inner radius to the size of the inner wheel since the inner part of the wheel
    'segments': [           //   is being drawn by the inner wheel we don't need to draw there.
        {'fillStyle' : '#4DB6AC', 'text' : 'Choice 1'},
        {'fillStyle' : '#4DB6AC', 'text' : 'Choice 2'},
        {'fillStyle' : '#4DB6AC', 'text' : 'Choice 3'},
        {'fillStyle' : '#4DB6AC', 'text' : 'Choice 4'},
        {'fillStyle' : '#3949AB', 'text' : 'Choice 1'},
        {'fillStyle' : '#3949AB', 'text' : 'Choice 2'},
        {'fillStyle' : '#3949AB', 'text' : 'Choice 3'},
        {'fillStyle' : '#3949AB', 'text' : 'Choice 4'},
        {'fillStyle' : '#1DE9B6', 'text' : 'Choice 1'},
        {'fillStyle' : '#1DE9B6', 'text' : 'Choice 2'},
        {'fillStyle' : '#1DE9B6', 'text' : 'Choice 3'},
        {'fillStyle' : '#1DE9B6', 'text' : 'Choice 4'},
        {'fillStyle' : '#FFFF00', 'text' : 'Choice 1'},
        {'fillStyle' : '#FFFF00', 'text' : 'Choice 2'},
        {'fillStyle' : '#FFFF00', 'text' : 'Choice 3'},
        {'fillStyle' : '#FFFF00', 'text' : 'Choice 4'}
        
    ],
    'animation':
    {
      'type': 'spinToStop',                     // Define animation more or less as normal, except for the callbackAfter().
      'duration': 5,
      'spins': 5,
      'easing': 'Power3.easeOut',
      'callbackAfter' : drawInnerWheel,     // Call back after each frame of the animation a function we can draw the inner wheel from.
      'callbackFinished': alertPrize
    }
});

function drawInnerWheel()
            {
                // Update the rotationAngle of the innnerWheel to match that of the outer wheel - this is a big part of what
                // links them to appear as one 2-part wheel. Call the draw function passing false so the outer wheel is not wiped.
                innerWheel.rotationAngle = outerWheel.rotationAngle;
                innerWheel.draw(false);
            }

// Alert on what the user landed on when the animation has finished.
function alertPrize()
{
    // The the indicated segments from the 2 wheels.
    let winningInnerSegment = innerWheel.getIndicatedSegment();
    let winningOuterSegment = outerWheel.getIndicatedSegment();

    // Alert the combination of prizes won.
    alert('You will be eating ' + winningInnerSegment.text + ', at ' + winningOuterSegment.text);

    // Set things so power and spin button can be clicked again.
    wheelSpinning = false;

    // Remove all colours from the power level indicators.
    document.getElementById('pw1').className = "";
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";
}

            // ================================================================================================================
            // FUNCTIONS FOR power controls below (All this is not necessary to actually create and spin a wheel)....
            // Vars used by the code in this page to do power controls.
            let wheelPower    = 0;
            let wheelSpinning = false;

            // -------------------------------------------------------
            // Function to handle the onClick on the power buttons.
            // -------------------------------------------------------
            function powerSelected(powerLevel)
            {
                // Ensure that power can't be changed while wheel is spinning.
                if (wheelSpinning == false) {
                    // Reset all to grey incase this is not the first time the user has selected the power.
                    document.getElementById('pw1').className = "";
                    document.getElementById('pw2').className = "";
                    document.getElementById('pw3').className = "";

                    // Now light up all cells below-and-including the one selected by changing the class.
                    if (powerLevel >= 1) {
                        document.getElementById('pw1').className = "pw1";
                    }

                    if (powerLevel >= 2) {
                        document.getElementById('pw2').className = "pw2";
                    }

                    if (powerLevel >= 3) {
                        document.getElementById('pw3').className = "pw3";
                    }

                    // Set wheelPower var used when spin button is clicked.
                    wheelPower = powerLevel;

                    // Light up the spin button by changing it's source image and adding a clickable class to it.
                    document.getElementById('spin_button').src = "spin_on.png";
                    document.getElementById('spin_button').className = "clickable";
                }
            }

            // -------------------------------------------------------
            // Click handler for spin button.
            // -------------------------------------------------------
            function startSpin()
            {
                // Ensure that spinning can't be clicked again while already running.
                if (wheelSpinning == false) {
                    // Reset things with inner and outer wheel so spinning will work as expected. Without the reset the
                    // wheel will probably just move a small amount since the rotationAngle would be close to the targetAngle
                    // figured out by the animation.
                    outerWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
                    outerWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
                    outerWheel.draw();                // Call draw to render changes to the wheel.
                    innerWheel.rotationAngle = 0;
                    innerWheel.draw(false);

                    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
                    // to rotate with the duration of the animation the quicker the wheel spins.
                    if (wheelPower == 1) {
                        outerWheel.animation.spins = 3;     // Number of spins and/or duration can be altered to make the wheel
                        outerWheel.animation.duration = 7;  // appear to spin faster or slower.
                    } else if (wheelPower == 2) {
                        outerWheel.animation.spins = 8;
                        outerWheel.animation.duration = 7;
                    } else if (wheelPower == 3) {
                        outerWheel.animation.spins = 15;
                    }

                    // Disable the spin button so can't click again while wheel is spinning.
                    document.getElementById('spin_button').src       = "spin_off.png";
                    document.getElementById('spin_button').className = "";

                    // Begin the spin animation by calling startAnimation on the wheel object.
                    outerWheel.startAnimation();

                    // Set to true so that power can't be changed and spin button re-enabled during
                    // the current animation. The user will have to reset before spinning again.
                    wheelSpinning = true;
                }
            }

//Rendering of component
function Wheel() {
    return (
        <div align="center">
        <br />
        <table cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td>
                    <div className="power_controls">
                        <br />
                        <br />
                        <table className="power" cellpadding="10" cellspacing="0">
                            <tr>
                                <th align="center">Power</th>
                            </tr>
                            <tr>
                                <td width="78" align="center" id="pw3" onClick="powerSelected(3);">High</td>
                            </tr>
                            <tr>
                                <td align="center" id="pw2" onClick="powerSelected(2);">Med</td>
                            </tr>
                            <tr>
                                <td align="center" id="pw1" onClick="powerSelected(1);">Low</td>
                            </tr>
                        </table>
                        <br />
                        <img id="spin_button" src="spin_off.png" alt="Spin" onClick="startSpin();" />
                    </div>
                </td>
                <td width="438" height="582" className="the_wheel" align="center" valign="center">
                    <canvas id="canvas" width="434" height="434">
                        // {Where these would render outerWheel.draw(); innerWheel.draw(false);}
                        <p style="{color: white}" align="center">Sorry, your browser doesn't support canvas. Please try another.</p>
                    </canvas>
                </td>
            </tr>
        </table>
    </div>
    );
  }

  export default Wheel;