private var worldTrans: Transform;

var target : Transform;

function Awake () {
	worldTrans = transform.root;
}

function OnTriggerEnter( other : Collider ) {
	other.transform.position = target.position;
 }