#pragma strict

var moveSpeed: float = 6; // move speed
var turnSpeed: float = 90; // turning speed (degrees/second)
var lerpSpeed: float = 10; // smoothing speed
var gravity: float = 10; // gravity acceleration
var isGrounded: boolean;
var deltaGround: float = 0.2; // character is grounded up to this distance
var jumpSpeed: float = 10; // vertical jump initial speed
var jumpRange: float = 10; // range to detect target wall
 
private var surfaceNormal: Vector3; // current surface normal
private var myNormal: Vector3; // character normal
private var distGround: float; // distance from character position to ground
private var jumping = false; // flag &quot;I'm jumping to wall&quot;
private var vertSpeed: float = 0; // vertical jump current speed 
  
function Start(){
    myNormal = transform.up; // normal starts as character up direction 
    rigidbody.freezeRotation = true; // disable physics rotation
    // distance from transform.position to ground
    distGround = collider.bounds.extents.y - collider.bounds.center.y;  
}
 
function FixedUpdate(){
    // apply constant weight force according to character normal:
    rigidbody.AddForce(-gravity*rigidbody.mass*myNormal);
}
 
function Update(){
    // jump code - jump to wall or simple jump
    if (jumping) return;  // abort Update while jumping to a wall
    var ray: Ray;
    var hit: RaycastHit;
    if (Input.GetButtonDown("Jump")){ // jump pressed:
        ray = Ray(transform.position, transform.forward);
    }
 
    // movement code - turn left/right with Horizontal axis:
    transform.Rotate(0, turnSpeed*Input.GetAxis("Horizontal")*Time.deltaTime, 0);
    // update surface normal and isGrounded:
    ray = Ray(transform.position, -myNormal); // cast ray downwards
    if (Physics.Raycast(ray, hit)){ // use it to update myNormal and isGrounded
        isGrounded = hit.distance <= distGround + deltaGround;
        surfaceNormal = hit.normal;
    }
    else {
        isGrounded = false;
        // assume usual ground normal to avoid "falling forever"
        surfaceNormal = Vector3.up; 
    }
    myNormal = Vector3.Lerp(myNormal, surfaceNormal, lerpSpeed*Time.deltaTime);
    // find forward direction with new myNormal:
    var myForward = Vector3.Cross(transform.right, myNormal);
    // align character to the new myNormal while keeping the forward direction:
    var targetRot = Quaternion.LookRotation(myForward, myNormal);
    transform.rotation = Quaternion.Lerp(transform.rotation, targetRot, lerpSpeed*Time.deltaTime);
    // move the character forth/back with Vertical axis:
    transform.Translate(0, 0, Input.GetAxis("Vertical")*moveSpeed*Time.deltaTime); 
    transform.Translate(Input.GetAxis("Horizontal")*moveSpeed*Time.deltaTime, 0, 0);
}