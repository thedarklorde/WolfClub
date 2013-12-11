private var targetPosition : Vector3;
private var rotated : boolean = false;
private var worldTrans: Transform;
private var targetpos : Vector3;

enum Direction {right, left, forward, back};
var target : Transform;
var TargetRotate : float = 90;
var SpinDirection : Direction;

function Awake () {
  worldTrans = transform.parent.parent;
 }

function OnTriggerEnter( other : Collider ) {
  Debug.Log(transform);
  for (var room : Transform in worldTrans) {
    switch ( SpinDirection ) {
      case 0:
        Debug.Log("Direction: right");
        room.Rotate (Vector3.right, TargetRotate);
        break;
      case 1:
        Debug.Log("Direction: left");
        room.Rotate (Vector3.left, TargetRotate);
        break;
      case 2:
        Debug.Log("Direction: forward");
        room.Rotate (Vector3.forward, TargetRotate);
        break;
      case 3:
        Debug.Log("Direction: back");
        room.Rotate (Vector3.back, TargetRotate);
        break;
      default:
        Debug.Log ("No direction choice");
     }
   }
  other.transform.position = target.position;
 }