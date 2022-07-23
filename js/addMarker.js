AFRAME.registerComponent("create-markers", {
  
    init: async function() {
  
      var mainScene = document.querySelector("#main-scene");
  
      //get the dishes collection from firestore database
      var dishes = await this.getDishes();
     
      dishes.map(dish => {
        var marker = document.createElement("a-marker");   
        marker.setAttribute("id", dish.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", crane.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
  
        //set the markerhandler component
        marker.setAttribute("markerhandler", {});
        mainScene.appendChild(marker);
  
        // Adding 3D model to scene
       var model=document.createElement("a-entity");
       model.setAttribute("gltf-model",`url(${crane.model_url})`)
       model.setAttribute("id",`model-${dish.id}`)
       model.setAttribute("position",dish.model_geometry.position)
       model.setAttribute("rotation",dish.model_geometry.rotation)
       model.setAttribute("scale",dish.model_geometry.scale)
       model.setAttribute("gesture-handler",{})
       marker.appendChild(model)
  
      
       var mainplane=document.createElement("a-plane")
       mainplane.setAttribute("id",`main-plane-${dish.id}`)
       mainplane.setAttribute("position",{x:0, y:0, z:0})
       mainplane.setAttribute("rotation",{x:-90, y:0, z:0})
       mainplane.setAttribute("width",1.7)
       mainplane.setAttribute("height",1.5)
       marker.appendChild(mainplane)
  
       
        var titleplane=document.createElement("a-plane");
       titleplane.setAttribute("id",`title-plane-${crane.id}`)
       titleplane.setAttribute("position",{x:0, y:0.89, z:0.02})
       titleplane.setAttribute("rotation",{x:0, y:0, z:0})
       titleplane.setAttribute("width",1.69)
       titleplane.setAttribute("height",0.5)
       titleplane.setAttribute("material",{color:"yellow"})
       mainplane.appendChild(titleplane)
  
        // Dish title
        var dishtitle=document.createElement("a-scene")
       dishtitle.setAttribute("id",`dish-title-${dish.id}`)
       dishtitle.setAttribute("position",{x:0, y:0, z:0.1})
       dishtitle.setAttribute("rotation",{x:0, y:0, z:0})
       dishtitle.setAttribute("text",{
        font:"monoid",
        color:"black",
        width:1.8,
        height:1,
        align:"centre",
        value:crane.toy_name.toUpperCase()
        
       })
       titleplane.appendChild(dishtitle)
  
        // Ingredients List
        var crane1 = document.createElement("a-entity");
        crane1.setAttribute("id", `crane1-${crane.id}`);
        crane1.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        crane1.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        crane1.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${crane.ingredients.join("\n\n")}`
        });
        mainPlane.appendChild(crane1);
      });
    },
  
    getToy: async function() {
      return await firebase
        .firestore()
        .collection("toy1")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  });
  