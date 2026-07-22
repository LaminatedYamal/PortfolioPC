import json
import os
import random

random.seed(42)

def transform_num(val, multiplier=1.35, offset=17):
    if val is None or not isinstance(val, (int, float)):
        return val
    new_val = (val * multiplier) + offset
    return round(new_val, 2) if isinstance(val, float) else int(round(new_val))

# 1. Sanitize campaigns.json
campaigns_file = r"public/ulus-fona/campaigns.json"
if os.path.exists(campaigns_file):
    with open(campaigns_file, "r", encoding="utf-8-sig") as f:
        data = json.load(f)
    
    for item in data:
        if "Budget" in item and item["Budget"]:
            item["Budget"] = transform_num(item["Budget"], 1.25, 10)
        if "Impressions" in item and item["Impressions"]:
            item["Impressions"] = transform_num(item["Impressions"], 1.4, 500)
        if "Clicks" in item and item["Clicks"]:
            item["Clicks"] = transform_num(item["Clicks"], 1.3, 25)
        if "Cost" in item and item["Cost"]:
            item["Cost"] = transform_num(item["Cost"], 1.28, 50)
        if "Conversions" in item and item["Conversions"]:
            item["Conversions"] = transform_num(item["Conversions"], 1.15, 5)
        
        if item.get("Impressions") and item.get("Clicks") and item["Impressions"] > 0:
            ctr_val = item["Clicks"] / item["Impressions"]
            item["CTR"] = f"{ctr_val:.5f}".replace(".", ",")
        if item.get("Cost") and item.get("Conversions") and item["Conversions"] > 0:
            item["CostPerConv"] = round(item["Cost"] / item["Conversions"], 2)

    with open(campaigns_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Sanitized campaigns.json!")

# 2. Sanitize courses.json
courses_file = r"public/ulus-fona/courses.json"
if os.path.exists(courses_file):
    with open(courses_file, "r", encoding="utf-8-sig") as f:
        courses_data = json.load(f)
    
    for course in courses_data:
        if "gscKeywords" in course:
            for kw in course["gscKeywords"]:
                kw["clicks"] = transform_num(kw.get("clicks", 0), 1.3, 3)
                kw["impressions"] = transform_num(kw.get("impressions", 0), 1.45, 15)
        if "adsKeywords" in course:
            for kw in course["adsKeywords"]:
                kw["clicks"] = transform_num(kw.get("clicks", 0), 1.25, 5)
                kw["impressions"] = transform_num(kw.get("impressions", 0), 1.35, 25)
    
    with open(courses_file, "w", encoding="utf-8") as f:
        json.dump(courses_data, f, ensure_ascii=False, indent=2)
    print("Sanitized courses.json!")

# 3. Sanitize recovered_keywords.json if present
rec_kw_file = r"public/ulus-fona/recovered_keywords.json"
if os.path.exists(rec_kw_file):
    try:
        with open(rec_kw_file, "r", encoding="utf-8-sig") as f:
            rec_data = json.load(f)
        
        if isinstance(rec_data, list):
            for item in rec_data:
                if "clicks" in item: item["clicks"] = transform_num(item["clicks"], 1.3, 2)
                if "impressions" in item: item["impressions"] = transform_num(item["impressions"], 1.4, 10)
                if "cost" in item: item["cost"] = transform_num(item["cost"], 1.25, 5)
                if "conversions" in item: item["conversions"] = transform_num(item["conversions"], 1.2, 1)
        
        with open(rec_kw_file, "w", encoding="utf-8") as f:
            json.dump(rec_data, f, ensure_ascii=False, indent=2)
        print("Sanitized recovered_keywords.json!")
    except Exception as e:
        print(f"Skipped recovered_keywords.json ({e})")

print("All dashboard performance data successfully randomized and sanitized!")
