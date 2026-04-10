import urllib.request,json,os,time
token=os.environ["GH_TOKEN"]
repos="acne-lab-jp,affiliate-lab-jp,ai-lab-jp,anti-aging-jp,baby-note-jp,beauty-device-jp,beauty-food-jp,bike-note-jp,body-care-jp,bodymake-lab-jp,calorie-lab-jp,camera-lab-jp,card-note-jp,career-note-jp,childcare-jp,coffee-note-jp,cooking-note-jp,credit-lab-jp,crypto-lab-jp,diet-lab-jp,diet-now,diet-now-jp,diet-recipe-jp,dropshipping-jp,english-lab-jp,eyebrow-lab-jp,eyelash-lab-jp,eyeshadow-lab-jp,fashion-note-jp,fitness-lab-jp,foundation-lab-jp,freelance-note-jp,fx-note-jp,gadget-lab-jp,golf-lab-jp,hair-care-jp,hair-loss-jp,hair-removal-jp,haircolor-lab,handmade-lab-jp,health-note-jp,insurance-note-jp,interior-log-jp,intermittent-fasting-jp,investment-lab-jp,job-change-jp,junior-soccer-jp,kbeauty-brand-jp,kcos-review-jp,kdrama-beauty-jp,keto-lab-jp,kmake-lab-jp,kskin-lab-jp,lip-lab-jp,loan-note-jp,makeup-lab-jp,mama-beauty-jp,mens-beauty-jp,mens-hair-jp,mindfulness-jp,money-note-jp,music-lab-jp,nail-lab-jp,nisa-note-jp,organic-cosme-jp,outdoor-note-jp,over40-beauty-jp,pension-lab-jp,perfume-lab-jp,perm-lab-jp,pet-love-jp,photo-lab-jp,pilates-lab-jp,programming-lab-jp,protein-lab-jp,reading-lab-jp,real-estate-jp,remote-work-jp,running-lab-jp,running-note-jp,sauna-log-jp,saving-lab-jp,side-job-jp,skill-up-jp,skincare-note-jp,sleep-lab-jp,sns-lab-jp,startup-note-jp,stretch-lab-jp,study-lab-jp,sunscreen-lab-jp,supplement-jp,swim-note-jp,tax-lab-jp,teens-beauty-jp,travel-log-jp,web3-lab-jp,whitening-lab-jp,yoga-pose-jp,youtube-lab-jp".split(",")
ready=[]
almost=[]
for r in repos:
    arts=0
    priv=False
    cont=False
    try:
        rq=urllib.request.Request(f"https://api.github.com/repos/okuwabara07-gif/{r}/contents/content/blog?per_page=100",headers={"Authorization":f"Bearer {token}"})
        res=json.loads(urllib.request.urlopen(rq).read())
        if isinstance(res,list):arts=len(res)
    except:pass
    for p in ["app/privacy/page.tsx","app/privacy-policy/page.tsx"]:
        try:
            rq=urllib.request.Request(f"https://api.github.com/repos/okuwabara07-gif/{r}/contents/{p}",headers={"Authorization":f"Bearer {token}"})
            urllib.request.urlopen(rq)
            priv=True
            break
        except:pass
    try:
        rq=urllib.request.Request(f"https://api.github.com/repos/okuwabara07-gif/{r}/contents/app/contact/page.tsx",headers={"Authorization":f"Bearer {token}"})
        urllib.request.urlopen(rq)
        cont=True
    except:pass
    if arts>=10 and priv and cont:
        ready.append((r,arts))
    elif arts>=5:
        almost.append((r,arts))
    time.sleep(0.2)
report=f"""週次AdSense申請レポート
申請可能({len(ready)}件):
{chr(10).join([f"  {x[0]} ({x[1]}記事)" for x in ready]) if ready else "  なし"}

あと少し({len(almost)}件):
{chr(10).join([f"  {x[0]} ({x[1]}記事)" for x in almost[:15]]) if almost else "  なし"}

申請URL: https://adsense.google.com/adsense/sites
"""
print(report)
with open("adsense_report.txt","w") as f:f.write(report)
with open(os.environ["GITHUB_OUTPUT"],"a") as f:f.write(f"ready={len(ready)}\n")
