private var targetPosition : Vector3;
private var rotated : boolean = false;
private var worldTrans: Transform;
private var targetpos : Vector3;
private var camTrans : Transform;

enum Direction {right, left, forward, back, up, none};
var SpinDirection : Direction;

var target : Transform;

function Awake () {
	worldTrans = transform.root;
	Debug.Log(worldTrans);
	camTrans = GameObject.FindWithTag("MainCamera").transform;
	Debug.Log(camTrans);
 }

function OnTriggerEnter( other : Collider ) {
	switch ( SpinDirection ) {
	case Direction.right:
		Debug.Log("Direction: right");
		worldTrans.Rotate (Vector3.right, 90);
		break;
	case Direction.left:
		Debug.Log("Direction: left");
		worldTrans.Rotate (Vector3.left, 90);
		break;
	case Direction.forward:
		Debug.Log("Direction: forward");
		worldTrans.Rotate (Vector3.forward, 90);
		break;
	case Direction.back:
		Debug.Log("Direction: back");
		worldTrans.Rotate (Vector3.back, 90);
		break;
	case Direction.up:
		Debug.Log("Direction: upside down");
		worldTrans.Rotate (Vector3.forward, 180);
		break;
	case Direction.none:
		Debug.Log("Direction: none");
		break;
	default:
		Debug.Log ("No direction choice");
	}
	other.transform.position = target.position;
 }