private var worldTrans: Transform;
private var targetUp: Transform;
private var PlayerLocation : String;
private var PortalRoom : Object;
private var NewRoom : Object;

enum TeleDirection {straight, left, right, flip};
var SpinDirection : TeleDirection;


var target : Transform;


//create variable tracking player location
//turn off all triggers in room player is not in
//turn on triggers when player arrives


function Awake () {
	worldTrans = transform.root;
	PlayerLocation = "Room1";
	PortalRoom = this.transform.parent;
	NewRoom = target.transform.parent.parent;
	if (PortalRoom.tag != PlayerLocation) {
		Deactivate();
	}
 }

function Activate () {
	Debug.Log(NewRoom);
	for (var i : int = 1; i < NewRoom.childCount; i++) {
		var portal = NewRoom.GetChild(i);
		if (portal.collider) {
			portal.collider.enabled = true;
			Debug.Log("Triggers on.");
		}
	}
}

function Deactivate () {
	for (var i : int = 1; i < PortalRoom.childCount; i++) {
		var portal = PortalRoom.GetChild(i);
		if (portal.collider) {
			portal.collider.enabled = false;
			Debug.Log("Triggers off.");
		}
	}
}

function OnTriggerEnter( other : Collider ) {
	Deactivate();
	Activate();
	var player = other.transform;
	switch ( SpinDirection ) {
	case TeleDirection.straight:
		Debug.Log("Direction: straight");
		player.position = target.position;
		break;
	case TeleDirection.left:
		Debug.Log("Direction: left");
		worldTrans.Rotate (Vector3.up, 90);
		player.position = target.position;
		break;
	case TeleDirection.right:
		Debug.Log("Direction: right");
		worldTrans.Rotate (Vector3.down, 90);
		player.position = target.position;
		break;
	case TeleDirection.flip:
		Debug.Log("Direction: flip");
		worldTrans.Rotate (Vector3.back, 90);
		other.transform.position = target.localPosition;
		break;
	default:
		Debug.Log ("No direction choice");
	}
 }