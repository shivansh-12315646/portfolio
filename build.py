import sys
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract parts
head_nav = html.split('<!-- ========== HERO ========== -->')[0]
footer = '<!-- ========== CONTACT ========== -->' + html.split('<!-- ========== CONTACT ========== -->')[1]

achievements_sec = '<!-- ========== ACHIEVEMENTS ========== -->\n' + html.split('<!-- ========== ACHIEVEMENTS ========== -->')[1].split('<!-- ========== CERTIFICATIONS ========== -->')[0]
certs_sec = '<!-- ========== CERTIFICATIONS ========== -->\n' + html.split('<!-- ========== CERTIFICATIONS ========== -->')[1].split('<!-- ========== CONTACT ========== -->')[0]

new_nav = '''    <ul class="nav-links">
      <li><a href="index.html#home" class="nav-link">Home</a></li>
      <li><a href="index.html#about" class="nav-link">About</a></li>
      <li><a href="index.html#education" class="nav-link">Education</a></li>
      <li><a href="index.html#projects" class="nav-link">Projects</a></li>
      <li><a href="index.html#skills" class="nav-link">Skills</a></li>
      <li><a href="achievements.html" class="nav-link">Achievements</a></li>
      <li><a href="certifications.html" class="nav-link">Certification</a></li>
      <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>'''

head_nav_standalone = re.sub(r'<ul class="nav-links">.*?</ul>', new_nav, head_nav, flags=re.DOTALL)

with open('achievements.html', 'w', encoding='utf-8') as f:
    f.write(head_nav_standalone + achievements_sec + footer)

with open('certifications.html', 'w', encoding='utf-8') as f:
    f.write(head_nav_standalone + certs_sec + footer)

print('Done!')
