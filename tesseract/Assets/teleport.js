var targetPosition : Vector3;
var targetRotation : Quaternion;
 
function OnTriggerEnter( other : Collider ) {
  other.transform.position = targetPosition;
  other.transform.rotation = targetRotation;
  
  Physics.gravity = Vector3(0, -9.3, 0);
 }