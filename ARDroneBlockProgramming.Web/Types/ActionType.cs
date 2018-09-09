using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ARDroneBlockProgramming.Web.Types
{
    public enum ActionType
    {
        Up = 0,
        Down = 1,
        Left = 2,
        Right = 3,
        Forward = 4,
        Back = 5,
        TurnRight = 6,
        TurnLeft = 7,
        TurnRightTillRecognize = 8,
        TurnLeftTillRecognize = 9
    }
}
