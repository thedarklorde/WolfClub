private var worldTrans: Transform;

enum Direction {right, left, back};
var SpinDirection : Direction;

var target : Transform;

function Awake () {
	worldTrans = transform.root;
	Debug.Log(worldTrans);
 }

function OnTriggerEnter( other : Collider ) {
	switch ( SpinDirection ) {
	case Direction.right:
		Debug.Log("Direction: right");
		worldTrans.Rotate (Vector3.up, 90);
		break;
	case Direction.left:
		Debug.Log("Direction: left");
		worldTrans.Rotate (Vector3.down, 90);
		break;
	case Direction.back:
		Debug.Log("Direction: back");
		worldTrans.Rotate (Vector3.back, 90);
		break;
	default:
		Debug.Log ("No direction choice");
	}
	other.transform.position = target.position;
 }