import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheLivrosComponent } from './detalhe-livros.component';

describe('DetalheLivrosComponent', () => {
  let component: DetalheLivrosComponent;
  let fixture: ComponentFixture<DetalheLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
