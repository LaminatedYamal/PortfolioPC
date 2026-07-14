import os
import zipfile
import shutil

zip_mappings = {
    "export-695eba9daecd0fe8be764d0a.zip": "scene_route66",
    "export-695ebbe9aecd0fe8be764d0b.zip": "scene_astronaut",
    "export-695ebc41aecd0fe8be764d0c.zip": "scene_saturn",
    "export-695ebc6a25fd497076285a7f.zip": "scene_omega"
}

public_dir = "public"
dest_base = os.path.join(public_dir, "spatial-scenes")

os.makedirs(dest_base, exist_ok=True)

for zip_name, folder_name in zip_mappings.items():
    zip_path = os.path.join(public_dir, zip_name)
    if not os.path.exists(zip_path):
        print(f"Zip file {zip_path} not found, skipping.")
        continue
    
    dest_path = os.path.join(dest_base, folder_name)
    os.makedirs(dest_path, exist_ok=True)
    
    print(f"Extracting {zip_name} to {dest_path}...")
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(dest_path)
    
    print(f"Done extracting {zip_name}.")

print("Extraction script completed successfully!")
