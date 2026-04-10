import urllib.request,json,os,time
token=os.environ["GH_TOKEN"]
target=os.environ.get("TARGET","all")
repos="acne-lab-jp,affiliate-lab-jp,ai-lab-jp,anti-aging-jp,baby-note-jp,beauty-device-jp,beauty-food-jp,bike-note-jp,body-care-jp,bodymake-lab-jp,calorie-lab-jp,camera-lab-jp,card-note-jp,career-note-jp,childcare-jp,coffee-note-jp,cooking-note-jp,credit-lab-jp,crypto-lab-jp,diet-lab-jp,diet-now,diet-now-jp,diet-recipe-jp,dropshipping-jp,english-lab-jp,eyebrow-lab-jp,eyelash-lab-jp,eyeshadow-lab-jp,fashion-note-jp,fitness-lab-jp,foundation-lab-jp,freelance-note-jp,fx-note-jp,gadget-lab-jp,golf-lab-jp,hair-care-jp,hair-loss-jp,hair-removal-jp,haircolor-lab,handmade-lab-jp,health-note-jp,insurance-note-jp,interior-log-jp,intermittent-fasting-jp,investment-lab-jp,job-change-jp,junior-soccer-jp,kbeauty-brand-jp,kcos-review-jp,kdrama-beauty-jp,keto-lab-jp,kmake-lab-jp,kskin-lab-jp,lip-lab-jp,loan-note-jp,makeup-lab-jp,mama-beauty-jp,mens-beauty-jp,mens-hair-jp,mindfulness-jp,money-note-jp,music-lab-jp,nail-lab-jp,nisa-note-jp,organic-cosme-jp,outdoor-note-jp,over40-beauty-jp,pension-lab-jp,perfume-lab-jp,perm-lab-jp,pet-love-jp,photo-lab-jp,pilates-lab-jp,programming-lab-jp,protein-lab-jp,reading-lab-jp,real-estate-jp,remote-work-jp,running-lab-jp,running-note-jp,sauna-log-jp,saving-lab-jp,side-job-jp,skill-up-jp,skincare-note-jp,sleep-lab-jp,sns-lab-jp,startup-note-jp,stretch-lab-jp,study-lab-jp,sunscreen-lab-jp,supplement-jp,swim-note-jp,tax-lab-jp,teens-beauty-jp,travel-log-jp,web3-lab-jp,whitening-lab-jp,yoga-pose-jp,youtube-lab-jp".split(",")
if target!="all":
    repos=[r for r in repos if target in r]
ok=0
for r in repos:
    try:
        d=json.dumps({"ref":"main"}).encode()
        rq=urllib.request.Request(f"https://api.github.com/repos/okuwabara07-gif/{r}/actions/workflows/auto-post.yml/dispatches",data=d,headers={"Authorization":f"Bearer {token}","Content-Type":"application/json"},method="POST")
        urllib.request.urlopen(rq)
        print(f"OK {r}")
        ok+=1
    except Exception as e:
        print(f"FAIL {r}: {e}")
    time.sleep(0.4)
print(f"トリガー完了: {ok}件")
