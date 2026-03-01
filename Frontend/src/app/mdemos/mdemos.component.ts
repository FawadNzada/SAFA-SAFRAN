import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MDemoOverview } from '../../models/mdemo.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-mdemos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mdemos.component.html',
  styleUrls: ['./mdemos.component.css'],
})
export class MDemosComponent implements OnInit {

  mdemos: MDemoOverview[] = [];
  filteredMdemos: MDemoOverview[] = [];

  private dataService = inject(DataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.dataService.getMDemos().subscribe({
      next: (data: MDemoOverview[]) => {
        this.mdemos = data;
        this.filteredMdemos = data;

        // 🔎 QueryParam "search" lesen
        this.route.queryParams.subscribe((params: Record<string, string>) => {
          const search = params['search'];

          // Wenn kein Suchtext → alles anzeigen
          if (!search || search.trim().length === 0) {
            this.filteredMdemos = this.mdemos;
            return;
          }

          const term = search.toLowerCase().trim();

          // ✅ 1) Exakte Treffer nach Name bevorzugen
          const exact = this.mdemos.filter(m =>
            ((m.name ?? '').toLowerCase().trim() === term)
          );

          if (exact.length === 1) {
            this.showDemo(exact[0]);
            return;
          }

          // ✅ 2) Sonst: sichere Suche über alle Felder
          this.filteredMdemos = this.mdemos.filter((m: MDemoOverview) => {
            const valuesAsText = Object.values(m)
              .filter(v => v !== null && v !== undefined)
              .map(v => String(v).toLowerCase())
              .join(' ');

            return valuesAsText.includes(term);
          });

          // ✅ 3) Wenn genau 1 Treffer → direkt öffnen
          if (this.filteredMdemos.length === 1) {
            this.showDemo(this.filteredMdemos[0]);
          }
        });
      },
      error: (error: unknown) => {
        console.error('Error loading mdemos:', error);
      }
    });
  }

  showDemo(mdemo: MDemoOverview): void {
    this.router.navigate(['/mdemo-detail', mdemo.id]);
  }

  addMDemo(): void {
    this.router.navigate(['/mdemo-add']);
  }

  editMDemo(mdemo: MDemoOverview): void {
    this.router.navigate(['/mdemo-update', mdemo.id]);
  }

  deleteMDemo(mdemo: MDemoOverview): void {
    if (confirm(`Do you really want to delete the mdemo "${mdemo.name}"?`)) {
      this.dataService.deleteMDemo(mdemo.id).subscribe({
        next: () => this.ngOnInit(),
        error: (error: unknown) => console.error('Error deleting mdemo:', error)
      });
    }
  }
}